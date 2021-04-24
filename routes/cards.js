const express = require('express')
const bodyParser = require('body-parser')
const Cards = require('../models/cards')
const UploadImage = require('../upload')

const upload = UploadImage('card')

const cardRouter = express.Router()

cardRouter.use(bodyParser.json())

cardRouter.route('/')

.get((req, res, next) =>{
    Cards.find(req.query)
    .then(cards =>{
        res.status(200).json(cards)
    })
    .catch(err => res.send(err.message))
})

    .post(upload.fields([{ name: 'image', maxCount: 1 }, { name:'compImages', maxCount:10}]), (req, res, next) =>{
    
    if (req.files.image) {
        var image = `${req.protocol}://${req.get('host')}/${req.files.image[0].destination}/${req.files.image[0].filename}`
    }
    if (req.files.compImages) {
        var componentsImages = req.files.compImages.map(item => `${req.protocol}://${req.get('host')}/${item.destination}/${item.filename}`)
    }
    const { color, price, width, height, type, enName, arName, occasions, sectors, packages, components } = req.body
    if (occasions) { var occArr = occasions.split(' ') }
    if (sectors) { var secArr = sectors.split(' ') }
    if(packages) {var packArr = packages.split(' ')}
    if(components) {
        var tempArr = JSON.parse(components)
        var i = 0
        var compArr = tempArr.map(item => {
            if(item.type == 'image'){
                item['uri'] = componentsImages[i]
                i++
            }
            return item
        })
    }

    const body = {
        color, 
        price, 
        width, 
        height, 
        enName,
        arName,
        type,
        image,
        occasions: occArr,
        sectors: secArr, 
        packages: packArr,
        components:compArr

    }

    Cards.create(body)
    .then(card =>{
        res.status(200).json(card)
    })
    .catch(err => res.send(err.message))
})

.put((req, res, next) =>{
    res.statusCode = 403
    res.end('put operation is not supported!')
})

.delete((req, res, next) =>{
    Cards.remove({})
    .then(response => res.status(200).json(response))
    .catch(err => res.send(err.message))
})

cardRouter.route('/array')

.post((req, res, next) => {
    Cards.find({_id:req.body})
        .then(cards => {
            res.status(200).json(cards)
        })
        .catch(err => res.send(err.message))
})

cardRouter.route('/:cardId')

.get((req, res, next) =>{
    Cards.findById(req.params.cardId)
    .then(card => {
        if(card){
            return res.status(200).json(card)
        }
        res.status(404).json({})
    })
    .catch(err => res.send(err.message))
})

.post((req, res, next) =>{
    res.statusCode = 403
    res.end('post operation is not supported!')
})

.put(upload.single('image'), async(req, res, next) =>{
    try{
        const Card = await Cards.findById(req.params.cardId)
        if(Card != null){
            Cards.findByIdAndUpdate(req.params.cardId, {
                $set: req.body
            }, {new: true})
            .then(card => res.status(200).json(card))
        }
        else{res.status(404).json({})}
    }
    catch(err){res.send(err.message)}
})

.delete((req, res, next) =>{
    Cards.findByIdAndDelete(req.params.cardId)
    .then(card =>{
        if(card){
            res.status(200).json(card)
        }
        else{
            res.status(404).json({})
        }
    })
    .catch(err => res.send(err.message))
})

module.exports = cardRouter
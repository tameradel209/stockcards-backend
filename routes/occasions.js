const express = require('express')
const bodyParser = require('body-parser')
const Occasions = require('../models/occasions')
const UploadImage = require('../upload')

const upload = UploadImage('occasion')

const occasionRouter = express.Router()

occasionRouter.use(bodyParser.json())

occasionRouter.route('/')

.get((req, res, next) =>{
    Occasions.find(req.query)
    .then(occations =>{
        res.status(200).json(occations)
    })
    .catch(err => res.send(err.message))
})

.post(upload.fields([{ name: 'backImage' }, { name: 'image' }]), (req, res, next) =>{
    if (req.files.image) {
        var image = `${req.protocol}://${req.get('host')}/${req.files.image[0].destination}/${req.files.image[0].filename}`
        console.log(image)
    }
    if (req.files.backImage) {
        var backImage = `${req.protocol}://${req.get('host')}/${req.files.backImage[0].destination}/${req.files.backImage[0].filename}`
        console.log(backImage)
    }
    const body = {
        image: image || '',
        backImage: backImage || '', 
        en: {
            name: req.body.enName
        },
        ar: {
            name: req.body.arName
        }
    }
    Occasions.create(body)
    .then(occasion =>{
        res.status(200).json(occasion)
    })
    .catch(err => res.send(err.message))
})

.put((req, res, next) =>{
    res.statusCode = 403
    res.end('put operation is not supported!')
})

.delete((req, res, next) =>{
    Occasions.remove({})
    .then(response => res.status(200).json(response))
    .catch(err => res.send(err.message))
})

occasionRouter.route('/:occasionId')

.get((req, res, next) =>{
    Occasions.findById(req.params.occasionId)
    .then(occasion => {
        if(occasion){
            return res.status(200).json(occasion)
        }
        res.status(404).json({})
    })
    .catch(err => res.send(err.message))
})

.post((req, res, next) =>{
    res.statusCode = 403
    res.end('post operation is not supported!')
})

    .put(upload.fields([{ name: 'backImage' }, { name: 'image' }]), async(req, res, next) =>{
    try{
        if (req.files.image) {
            var image = `${req.protocol}://${req.get('host')}/${req.files.image[0].destination}/${req.files.image[0].filename}`
            console.log(image)
        }
        if (req.files.backImage) {
            var backImage = `${req.protocol}://${req.get('host')}/${req.files.backImage[0].destination}/${req.files.backImage[0].filename}`
            console.log(backImage)
        }
        const Occasion = await Occasions.findById(req.params.occasionId)
        const body = {
            image: image || Occasion.image,
            backImage: backImage || Occasion.backImage,
            en: {
                name: req.body.enName || Occasion.en.name
            },
            ar: {
                name: req.body.arName || Occasion.ar.name
            }
        }
        if(Occasion != null){
            Occasions.findByIdAndUpdate(req.params.occasionId, {
                $set: body
            }, {new: true})
            .then(occasion => res.status(200).json(occasion))
        }
        else{res.status(404).json({})}
    }
    catch(err){res.send(err.message)}

})

.delete((req, res, next) =>{
    Occasions.findByIdAndDelete(req.params.occasionId)
    .then(occasion =>{
        if(occasion){
            res.status(200).json(occasion)
        }
        else{
            res.status(404).json({})
        }
    })
    .catch(err => res.send(err.message))
})

module.exports = occasionRouter
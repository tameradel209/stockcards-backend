const express = require('express')
const bodyParser = require('body-parser')
const Packages = require('../models/packages')
const UploadImage = require('../upload')
const fs = require('fs')

const upload = UploadImage('package')

const packageRouter = express.Router()

packageRouter.use(bodyParser.json())

packageRouter.route('/')

.get((req, res, next) =>{
    Packages.find(req.query).populate(['advantages', 'offers'])
    .then(packages =>{
        res.status(200).json(packages)
    })
    .catch(err => res.send(err.message))
})

.post(upload.fields([{name:'backImage'}, {name:'image'}]), (req, res, next) =>{
    console.log(req.files)
    if (req.files.image) {
        var image = `${req.protocol}://${req.get('host')}/${req.files.image[0].destination}/${req.files.image[0].filename}`
        console.log(image)
    }
    if (req.files.backImage) {
        var backImage = `${req.protocol}://${req.get('host')}/${req.files.backImage[0].destination}/${req.files.backImage[0].filename}`
        console.log(backImage)
    }
    const { color, price, advantages, offers, enName, enType, enDescription, arName, arType, arDescription} = req.body
    if (advantages) { var advsArr = advantages.split(' ')}
    if (offers) { var offerArr = offers.split(' ') }
    const body = {
        image,
        backImage,
        color,
        price,
        advantages: advsArr,
        offers: offerArr,
        en: {
            name: enName,
            type: enType,
            description: enDescription
        },
        ar: {
            name: arName,
            type: arType,
            description: arDescription
        }
    }
    Packages.create(body)
    .then(package =>{
        res.status(200).json(package)
    })
    .catch(err => res.send(err.message))
})

.put((req, res, next) =>{
    res.statusCode = 403
    res.end('put operation is not supported!')
})

.delete((req, res, next) =>{
    //fs.unlinkSync(process.cwd()+'/public/images/package-mw9z4xj8q.png', err => console.log(err.message))
    Packages.remove({})
    .then(response => res.status(200).json(response))
    .catch(err => res.send(err.message))
})

packageRouter.route('/:packageId')

.get((req, res, next) =>{
    Packages.findById(req.params.packageId)
    .then(package => {
        if(package){
            return res.status(200).json(package)
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
        console.log(req.files)
        if (req.files.image) {
            var image = `${req.protocol}://${req.get('host')}/${req.files.image[0].destination}/${req.files.image[0].filename}`
            console.log(image)
        }
        if (req.files.backImage) {
            var backImage = `${req.protocol}://${req.get('host')}/${req.files.backImage[0].destination}/${req.files.backImage[0].filename}`
            console.log(backImage)
        }
        const { color, advantages, offers, enName, enType, enDescription, enPrice, enCurrency, arName, arType, arDescription, arPrice, arCurrency } = req.body
        if (advantages) { var advsArr = advantages.split(' ') }
        if (offers) { var offerArr = offers.split(' ') }
        const Package = await Packages.findById(req.params.packageId)
        if(Package != null){
            Packages.findByIdAndUpdate(req.params.packageId, {
                $set: {
                    image: image || Package.image,
                    backImage: backImage || Package.backImage,
                    advantages: advsArr || Package.advantages,
                    offers: offerArr || Package.offers,
                    color: color || Package.color,
                    en:{
                        name: enName || Package.en.name, 
                        type: enType || Package.en.type, 
                        description: enDescription || Package.en.description,
                        price: enPrice || Package.en.price,
                        currency: enCurrency || Package.en.currency,
                    }, 
                    ar:{
                        name: arName || Package.ar.name, 
                        type: arType || Package.ar.type, 
                        description: arDescription || Package.ar.description,
                        price: arPrice || Package.ar.price,
                        currency: arCurrency || Package.ar.currency,
                    }
                }
            }, {new: true})
            .then(package => res.status(200).json(package))
        }
        else{res.status(404).json({})}
    }
    catch(err){res.send(err.message)}

})

.delete((req, res, next) =>{
    Packages.findByIdAndDelete(req.params.packageId)
    .then(package =>{
        if(package){
            res.status(200).json(package)
        }
        else{
            res.status(404).json({})
        }
    })
    .catch(err => res.send(err.message))
})

module.exports = packageRouter
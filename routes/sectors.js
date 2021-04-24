const express = require('express')
const bodyParser = require('body-parser')
const Sectors = require('../models/sectors')
const UploadImage = require('../upload')

const upload = UploadImage('sector')

const sectorRouter = express.Router()

sectorRouter.use(bodyParser.json())

sectorRouter.route('/')

.get((req, res, next) =>{
    Sectors.find(req.query)
    .then(sectors =>{
        res.status(200).json(sectors)
    })
    .catch(err => res.send(err.message))
})

.post(upload.fields([{ name: 'backImage' }, { name: 'image' }]),  (req, res, next) =>{
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
    Sectors.create(body)
    .then(sector =>{
        res.status(200).json(sector)
    })
    .catch(err => res.send(err.message))
})

.put((req, res, next) =>{
    res.statusCode = 403
    res.end('put operation is not supported!')
})

.delete((req, res, next) =>{
    Sectors.remove({})
    .then(response => res.status(200).json(response))
    .catch(err => res.send(err.message))
})

sectorRouter.route('/:sectorId')

.get((req, res, next) =>{
    Sectors.findById(req.params.sectorId)
    .then(sector => {
        if(sector){
            return res.status(200).json(sector)
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
        }
        if (req.files.backImage) {
            var backImage = `${req.protocol}://${req.get('host')}/${req.files.backImage[0].destination}/${req.files.backImage[0].filename}`
        }

        const Sector = await Sectors.findById(req.params.sectorId)
        const body = {
            image: image || Sector.image,
            backImage: backImage || Sector.backImage,
            en: {
                name: req.body.enName || Sector.en.name
            },
            ar: {
                name: req.body.arName || Sector.ar.name
            }
        }
        if(Sector != null){
            Sectors.findByIdAndUpdate(req.params.sectorId, {
                $set: body
            }, {new: true})
            .then(sectors => res.status(200).json(sectors))
        }
        else{res.status(404).json({})}
    }
    catch(err){res.send(err.message)}

})

.delete((req, res, next) =>{
    Sectors.findByIdAndDelete(req.params.sectorId)
    .then(sector =>{
        if(sector){
            res.status(200).json(sector)
        }
        else{
            res.status(404).json({})
        }
    })
    .catch(err => res.send(err.message))
})

module.exports = sectorRouter
const express = require('express')
const bodyParser = require('body-parser')
const UploadImage = require('../upload')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

const upload = UploadImage('image')

const imagesRouter = express.Router()

imagesRouter.use(bodyParser.json())

imagesRouter.route('/')

.post(upload.array('images', 10), (req, res, next) =>{
    try{
        console.log(req.files, req.protocol, req.get('host'))
        if(req.files){
            var images = req.files.map(file => `${req.protocol}://${req.get('host')}/${file.destination}/${file.filename}`)
            return res.status(200).json({uri:images, success:true})
        }
    }
    catch(err){res.status(500).json({uri:err.message, success:false})}
})

imagesRouter.route('/')

.delete(async(req, res, next) => {
    const result = await unlinkAsync(req.file.path)
    res.status(200).end(result)
})

module.exports = imagesRouter
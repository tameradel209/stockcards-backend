const express = require('express')
const bodyParser = require('body-parser')
const Information = require('../models/information')
const UploadImage = require('../upload')
var authentication = require('../authentication')


const upload = UploadImage('info')

const infoRouter = express.Router()

infoRouter.use(bodyParser.json())

infoRouter.route('/')

.get((req, res, next) =>{
    Information.find({})
    .then(info =>{
        res.status(200).json(info)
    })
    .catch(err => res.send(err.message))
})

.post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) =>{
    Information.create(req.body)
    .then(info => {
        res.status(200).json(info)
    })
    .catch(err => res.send(err.message))
})

.put((req, res, next) =>{
    Information.findOneAndUpdate({}, {$set:req.body}, {new: true})
    .then(info => res.status(200).json(info))
    .catch(err => res.send(err.message))
})

module.exports = infoRouter
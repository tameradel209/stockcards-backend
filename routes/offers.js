const express = require('express')
const bodyParser = require('body-parser')
const Offers = require('../models/offers')

const offerRouter = express.Router()

offerRouter.use(bodyParser.json())

offerRouter.route('/')

    .get((req, res, next) => {
        Offers.find(req.query)
            .then(offers => {
                res.status(200).json(offers)
            })
            .catch(err => res.send(err.message))
    })

    .post((req, res, next) => {
        Offers.create(req.body)
            .then(offer => {
                res.status(200).json(offer)
            })
            .catch(err => res.send(err.message))
    })

    .put((req, res, next) => {
        res.statusCode = 403
        res.end('put operation is not supported!')
    })

    .delete((req, res, next) => {
        Offers.remove({})
            .then(response => res.status(200).json(response))
            .catch(err => res.send(err.message))
    })

offerRouter.route('/:offerId')

    .get((req, res, next) => {
        Offers.findById(req.params.offerId)
            .then(offer => {
                if (offer) {
                    return res.status(200).json(offer)
                }
                res.status(404).json({})
            })
            .catch(err => res.send(err.message))
    })

    .post((req, res, next) => {
        res.statusCode = 403
        res.end('post operation is not supported!')
    })

    .put(async(req, res, next) => {
        try {
            const Offer = await Offers.findById(req.params.offerId)
            if (Offer != null) {
                Offers.findByIdAndUpdate(req.params.offerId, {$set: req.body}, { new: true })
                .then(offer => res.status(200).json(offer))
            }
            else { res.status(404).json({}) }
        }
        catch (err) { res.send(err.message) }

    })

    .delete((req, res, next) => {
        Offers.findByIdAndDelete(req.params.offerId)
            .then(offer => {
                if (offer) {
                    res.status(200).json(offer)
                }
                else {
                    res.status(404).json({})
                }
            })
            .catch(err => res.send(err.message))
    })

module.exports = offerRouter
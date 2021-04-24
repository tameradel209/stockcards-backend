const express = require('express')
const bodyParser = require('body-parser')
const Advantages = require('../models/advantages')

const advantageRouter = express.Router()

advantageRouter.use(bodyParser.json())

advantageRouter.route('/')

    .get((req, res, next) => {
        Advantages.find(req.query)
            .then(advantages => {
                res.status(200).json(advantages)
            })
            .catch(err => res.send(err.message))
    })

    .post((req, res, next) => {
        Advantages.create(req.body)
            .then(advantage => {
                res.status(200).json(advantage)
            })
            .catch(err => res.send(err.message))
    })

    .put((req, res, next) => {
        res.statusCode = 403
        res.end('put operation is not supported!')
    })

    .delete((req, res, next) => {
        Advantages.remove({})
            .then(response => res.status(200).json(response))
            .catch(err => res.send(err.message))
    })

advantageRouter.route('/:advantageId')

    .get((req, res, next) => {
        Advantages.findById(req.params.advantageId)
            .then(advantage => {
                if (advantage) {
                    return res.status(200).json(advantage)
                }
                res.status(404).json({})
            })
            .catch(err => res.send(err.message))
    })

    .post((req, res, next) => {
        res.statusCode = 403
        res.end('post operation is not supported!')
    })

    .put(async (req, res, next) => {
        try {
            const Advantage = await Advantages.findById(req.params.advantageId)
            if (Advantage != null) {
                Advantages.findByIdAndUpdate(req.params.advantageId, { $set: req.body }, { new: true })
                    .then(advantage => res.status(200).json(advantage))
            }
            else { res.status(404).json({}) }
        }
        catch (err) { res.send(err.message) }

    })

    .delete((req, res, next) => {
        Advantages.findByIdAndDelete(req.params.advantageId)
            .then(advantage => {
                if (advantage) {
                    res.status(200).json(advantage)
                }
                else {
                    res.status(404).json({})
                }
            })
            .catch(err => res.send(err.message))
    })

module.exports = advantageRouter
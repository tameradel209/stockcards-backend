const express = require('express')
const bodyParser = require('body-parser')
const authentication = require('../authentication')
const Carts = require('../models/cart')

const userCartRouter = express.Router()

userCartRouter.use(bodyParser.json())

userCartRouter.route('/admin')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        Carts.find({}).populate(['user', 'card'])
            .then(carts => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(carts)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        Carts.findOne({ user: req.user._id, card: req.body._id })
            .then(cart => {
                if (cart) {
                    return res.status(200).end(`${req.body._id} card is already in cart`)
                }
                Carts.create({
                    user: req.user._id,
                    card: req.body._id
                })
                    .then(c => res.status(200).json(c))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        Carts.remove({})
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })

userCartRouter.route('/user')

    .get(authentication.verifyUser, (req, res, next) => {
        Carts.find({ user: req.user._id }).populate(['card'])
            .then(cart => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(cart)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, (req, res, next) => {
        Carts.findOne({ user: req.user._id, card: req.body._id })
            .then(cart => {
                if (cart) {
                    return res.status(200).end(`${req.body._id} card is already in cart`)
                }
                Carts.create({
                    user: req.user._id,
                    card: req.body._id
                })
                    .then(c => res.status(200).json(c))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        Carts.findOneAndRemove({ user: req.user._id, card: req.body._id })
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })


userCartRouter.route('/:CardId')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        Carts.findById(req.params.CardId)
            .then(c => res.status(200).json(c))
            .catch(err => next(err))
    })
    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        const err = new Error('POST operation is not supported')
        err.status = 403
        next(err)
    })

    .put(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        Carts.findByIdAndRemove(req.params.CardId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }).catch(err => next(err))
    })

module.exports = userCartRouter
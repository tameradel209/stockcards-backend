const express = require('express')
const bodyParser = require('body-parser')
const authentication = require('../authentication')
const UserOrders = require('../models/userOrders')

const userOrdersRouter = express.Router()

userOrdersRouter.use(bodyParser.json())

userOrdersRouter.route('/admin')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserOrders.find({}).populate(['user', 'card'])
            .then(orders => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(orders)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserOrders.findOne({ user: req.user._id, card: req.body._id })
            .then(order => {
                if (order) {
                    return res.status(200).end(`${req.body._id} card is already ordered`)
                }
                UserOrders.create({
                    user: req.user._id,
                    card: req.body._id
                })
                    .then(order => res.status(200).json(order))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserOrders.remove({})
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })

userOrdersRouter.route('/user')

    .get(authentication.verifyUser, (req, res, next) => {
        UserOrders.find({ user: req.user._id }).populate(['card'])
            .then(orders => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(orders)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, (req, res, next) => {
        UserOrders.findOne({ user: req.user._id, card: req.body._id })
            .then(order => {
                if (order) {
                    return res.status(200).end(`${req.body._id} card is already ordered`)
                }
                UserOrders.create({
                    user: req.user._id,
                    card: req.body._id
                })
                    .then(order => res.status(200).json(order))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        UserOrders.findOneAndRemove({ user: req.user._id, card: req.body._id })
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })


userOrdersRouter.route('/:orderId')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserOrders.findById(req.params.orderId)
            .then(order => res.status(200).json(order))
            .catch(err => next(err))
    })
    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        const err = new Error('POST operation is not supported')
        err.status = 403
        next(err)
    })

    .put(async (req, res, next) => {
        try {
            const UserOrder = await UserOrders.findById(req.params.orderId)
            if (UserOrder != null) {
                UserOrders.findByIdAndUpdate(req.params.orderId, { $set: req.body }, { new: true })
                    .then(userOrder => res.status(200).json(userOrder))
            }
            else { res.status(404).json({}) }
        }
        catch (err) { res.send(err.message) }
    })

    .delete(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserOrders.findByIdAndRemove(req.params.orderId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }).catch(err => next(err))
    })

module.exports = userOrdersRouter
const express = require('express')
const bodyParser = require('body-parser')
const authentication = require('../authentication')
const UserFavorites = require('../models/userFavorites')

const userfavoritesRouter = express.Router()

userfavoritesRouter.use(bodyParser.json())

userfavoritesRouter.route('/admin')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserFavorites.find({}).populate(['user', 'card'])
            .then(favorites => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favorites)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserFavorites.findOne({ user: req.user._id, card: req.body._id })
            .then(favorite => {
                if (favorite) {
                    return res.status(200).end(`${req.body._id} card is already favorite`)
                }
                UserFavorites.create({
                    user: req.user._id,
                    card: req.body._id
                })
                    .then(favorite => res.status(200).json(favorite))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        UserFavorites.remove({})
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })

userfavoritesRouter.route('/user')

    .get(authentication.verifyUser, (req, res, next) => {
        UserFavorites.find({ user: req.user._id }).populate(['card'])
            .then(favorites => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favorites)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, (req, res, next) => {
        UserFavorites.findOne({ user: req.user._id, card: req.body._id })
        .then(favorite => {
            if (favorite) {
                return res.status(200).end(`${req.body._id} card is already favorite`)
            }
            UserFavorites.create({
                user: req.user._id,
                card: req.body._id
            })
                .then(favorite => res.status(200).json(favorite))
        })
        .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        UserFavorites.findOneAndRemove({ user: req.user._id, card:req.body._id })
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })


userfavoritesRouter.route('/:favouriteId')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserFavorites.findById(req.params.favouriteId)
        .then(favorite => res.status(200).json(favorite))
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
        UserFavorites.findByIdAndRemove(req.params.favouriteId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }).catch(err => next(err))
    })

module.exports = userfavoritesRouter
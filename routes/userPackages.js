const express = require('express')
const bodyParser = require('body-parser')
const authentication = require('../authentication')
const UserPackages = require('../models/userPackages')

const userPackagesRouter = express.Router()

userPackagesRouter.use(bodyParser.json())

userPackagesRouter.route('/admin')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserPackages.find({}).populate(['user', 'package'])
            .then(packages => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(packages)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserPackages.findOne({ user: req.user._id, package: req.body._id })
            .then(package => {
                if (package) {
                    return res.status(200).end(`${req.body._id} package is already in use`)
                }
                UserPackages.create({
                    user: req.user._id,
                    package: req.body._id
                })
                    .then(package => res.status(200).json(package))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        UserPackages.remove({})
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })

userPackagesRouter.route('/user')

    .get(authentication.verifyUser, (req, res, next) => {
        UserPackages.find({ user: req.user._id }).populate(['package'])
            .then(packages => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(packages)
            })
            .catch(err => next(err))
    })

    .post(authentication.verifyUser, (req, res, next) => {
        UserPackages.findOne({ user: req.user._id, package: req.body._id })
            .then(package => {
                if (package) {
                    return res.status(200).end(`${req.body._id} package is already in use`)
                }
                UserPackages.create({
                    user: req.user._id,
                    package: req.body._id
                })
                    .then(package => res.status(200).json(package))
            })
            .catch(err => next(err))
    })

    .put(authentication.verifyUser, (req, res, next) => {
        const err = new Error('PUT operation is not supported')
        err.status = 403
        next(err)
    })

    .delete(authentication.verifyUser, (req, res, next) => {
        UserPackages.findOneAndRemove({ user: req.user._id, package: req.body._id })
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            })
            .catch(err => next(err))
    })


userPackagesRouter.route('/:userPackageId')

    .get(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserPackages.findById(req.params.userPackageId)
            .then(package => res.status(200).json(package))
            .catch(err => next(err))
    })
    .post(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        const err = new Error('POST operation is not supported')
        err.status = 403
        next(err)
    })

    .put(async (req, res, next) => {
        try {
            const UserPackage = await UserPackages.findById(req.params.userPackageId)
            if (UserPackage != null) {
                UserPackages.findByIdAndUpdate(req.params.userPackageId, { $set: req.body }, { new: true })
                    .then(userPackage => res.status(200).json(userPackage))
            }
            else { res.status(404).json({}) }
        }
        catch (err) { res.send(err.message) }

    })

    .delete(authentication.verifyUser, authentication.verifyAdmin, (req, res, next) => {
        UserPackages.findByIdAndRemove(req.params.userPackageId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }).catch(err => next(err))
    })

module.exports = userPackagesRouter
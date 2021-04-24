const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userPackagesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    package: {
        type: Schema.Types.ObjectId,
        ref: 'Package'
    }
}, { timestamps: true })

const UserPackages = mongoose.model('UserPackage', userPackagesSchema)

module.exports = UserPackages
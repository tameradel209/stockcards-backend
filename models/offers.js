const mongoose = require('mongoose')

const Schema = mongoose.Schema

const offersSchema = new Schema({
    en: {
        title: String
    },
    ar: {
        title: String,
    },
    chooseOccasion: {
        type: Boolean,
        default: false
    },
    chooseOccasions: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Offers = mongoose.model('Offer', offersSchema)

module.exports = Offers
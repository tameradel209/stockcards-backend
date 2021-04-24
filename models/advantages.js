const mongoose = require('mongoose')

const Schema = mongoose.Schema

const advantagesSchema = new Schema({
    en:{
        title: {
            type: String
        },
        value: {
            type: String
        }
    },
    ar:{
        title: {
            type: String
        },
        value: {
            type: String
        }
    }
}, { timestamps: true })

const Advantages = mongoose.model('Advantage', advantagesSchema)

module.exports = Advantages
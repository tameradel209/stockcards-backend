const mongoose = require('mongoose')

const Schema = mongoose.Schema

const infoSchema = new Schema({
    LECurrency:Number,
    dolarCurrency: Number,
    KWDCurrency: Number,
    en:{
        about: [{
            type: String,
            value: String
        }],
        vision: {
            type: String,
            required: true
        },
        goal: {
            type: String,
            required: true
        },
        location:{
            title: {
                type: String,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            }
        },
        phones:[{
            code: {
            type: String,
            required: true
        },
            number: {
            type: String,
            required: true
        }
        }],
        email: {
            type: String,
            required: true
        },
        social:{
            facebook: {
            type: String,
            required: true
        },
            twitter: {
            type: String,
            required: true
        },
            instagram: {
            type: String,
            required: true
        },
            linkedin: {
            type: String,
            required: true
        }
        },
        privacy:[{
            title: {
            type: String,
            required: true
        },
            value: {
            type: String,
            required: true
        }
        }],
        terms:[{
            title: {
            type: String,
            required: true
        },
            value: {
            type: String,
            required: true
        }
        }],
        questions:[{
            question: {
            type: String,
            required: true
        },
            answer: {
            type: String,
            required: true
        }
        }],
        howToDesign: [{
            video: String,
            title: String
        }]
    },
    ar:{
        about: [{
            type: {
                type: String
            },
            value: {
                type: String
            }
        }],
        vision: {
            type: String,
            required: true
        },
        goal: {
            type: String,
            required: true
        },
        location:{
            title: {
                type: String,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            }
        },
        phones:[{
            code: {
            type: String,
            required: true
        },
            number: {
            type: String,
            required: true
        }
        }],
        email: {
            type: String,
            required: true
        },
        social:{
            facebook: {
            type: String,
            required: true
        },
            twitter: {
            type: String,
            required: true
        },
            instagram: {
            type: String,
            required: true
        },
            linkedin: {
            type: String,
            required: true
        }
        },
        privacy:[{
            title: {
            type: String,
            required: true
        },
            value: {
            type: String,
            required: true
        }
        }],
        terms:[{
            title: {
            type: String,
            required: true
        },
            value: {
            type: String,
            required: true
        }
        }],
        questions:[{
            question: {
            type: String,
            required: true
        },
            answer: {
            type: String,
            required: true
        }
        }],
        howToDesign: [{
            video: String,
            title: String
        }]
    }
}, {timestamps: true})

const Information = mongoose.model('Information', infoSchema)

module.exports = Information
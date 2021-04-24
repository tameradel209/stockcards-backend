const mongoose = require('mongoose')

const Schema = mongoose.Schema

const occasionSchema = new Schema({
    image: {
        type: String,
        default: ''
    },
    backImage:{
        type: String,
        default: ''
    },
    en:{
        name:{
            type: String,
            required: true
        }
    },
    ar:{
        name:{
            type: String,
            required: true
        }
    }
}, {timestamps: true})

occasionSchema.virtual('id').get(function () {return this._id.toHexString() })
occasionSchema.set('toJSON', {virtuals: true})

const Occasions = mongoose.model('Occasion', occasionSchema)

module.exports = Occasions
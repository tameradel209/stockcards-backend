const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sectorSchema = new Schema({
    image: {
        type: String,
        default: ''
    },
    backImage: {
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

sectorSchema.virtual('id').get(function () {return this._id.toHexString() })
sectorSchema.set('toJSON', {virtuals: true})

const Sectors = mongoose.model('Sector', sectorSchema)

module.exports = Sectors
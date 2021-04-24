const mongoose = require('mongoose')

const Schema = mongoose.Schema

const packageSchema = new Schema({
    image: {
        type: String,
        default: ''
    },
    backImage:{
        type: String,
        default: ''
    },
    price: {
        type: Number,
        //required: true,
        min: 0
    },
    color: String,
    advantages: [{
        type: Schema.Types.ObjectId,
        ref: 'Advantage'
    }],
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    en:{
        name:{
            type: String,
            //required: true
        },
        type:{
            type: String,
            //required: true
        },
        description:{
            type: String,
            //required: true
        }
    },
    ar:{
        name:{
            type: String,
            //required: true
        },
        type:{
            type: String,
            //required: true
        },
        description:{
            type: String,
            //required: true
        }
    }
}, {timestamps: true})

packageSchema.virtual('id').get(function () {return this._id.toHexString() })
packageSchema.set('toJSON', {virtuals: true})

const Packages = mongoose.model('Package', packageSchema)

module.exports = Packages
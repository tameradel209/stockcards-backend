const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transformSchema = new Schema({
    translateX: Number,
    translateY: Number,
    rotate: String,
    rotateX: String,
    rotateY: String,
    scaleX: Number,
    scaleY: Number,
    matrix: Number,
    perspective: Number,
    skewX: String,
    skewY: String,

}, {autoIndex:false, _id:false})

const cardSchema = new Schema({
    sectors: [{
        type: Schema.Types.ObjectId,
        ref: 'Sector'
    }],
    occasions:[{
        type: Schema.Types.ObjectId,
        ref: 'Occasion'
    }],
    packages: [{
        type: Schema.Types.ObjectId,
        ref: 'Package'
    }],
    arname: String,
    enname: String,
    sale: Number,
    color: String,
    price: Number,
    image: String,
    width: Number,
    height: Number,
    type: String,
    components:[{
        type:{
            type: String,
            required: true
        },
        text: String,
        uri: String,
        style:{
            height: Number,
            width: Number,
            textAlign: String,
            fontSize: Number,
            fontWeight: String,
            fontFamily: String,
            color: String,
            backgroundColor: String,
            position: {
                type: String,
                default: 'absolute'
            },
            transform: [transformSchema]
        }
    }]
}, {timestamps: true})

const Cards = mongoose.model('Card', cardSchema)

module.exports = Cards
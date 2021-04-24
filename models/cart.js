const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }
}, { timestamps: true })

const Carts = mongoose.model('Cart', cartSchema)

module.exports = Carts
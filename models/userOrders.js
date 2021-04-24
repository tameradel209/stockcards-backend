const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userOrdersSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    card:{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }
}, { timestamps: true })

const UserOrders = mongoose.model('UserOrder', userOrdersSchema)

module.exports = UserOrders
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userFavoritesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    card: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }
}, { timestamps: true })

const UserFavorites = mongoose.model('UserFavorite', userFavoritesSchema)

module.exports = UserFavorites
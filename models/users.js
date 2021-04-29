const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname:{
        type: String,
        default: ''
    },
    phone:{
        type: String,
        default: ''
    },
    image:{
        type: String,
        default: ''
    },
    googleId:{
        type: String
    },
    facebookId:{
        type: String,
    },
    twitterId:{
        type: String,
    },
    admin:{
        type: Boolean,
        default: false
    },
    resetToken: String,
    expireToken:Date 
}, {timestamps:true})

UserSchema.virtual('id').get(function () { return this._id.toHexString() })
UserSchema.set('toJSON', { virtuals: true })

//this will create username and password in encrypted form
UserSchema.plugin(passportLocalMongoose)

const Users = mongoose.model('User', UserSchema)

module.exports = Users
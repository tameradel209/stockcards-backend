const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const jwtExtract = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const facebookStrategy = require('passport-facebook-token')
const TwitterStrategy = require('passport-twitter-token')
const Users = require('./models/users')
const fetch = require('node-fetch')

exports.local = passport.use(new localStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

const secretKey = process.env.SECRET_KEY

exports.getToken = (user) =>{
    return jwt.sign(user, secretKey, {expiresIn:"30d"})
}

var options = {}

options.secretOrKey = secretKey
options.jwtFromRequest = jwtExtract.fromAuthHeaderAsBearerToken(),



exports.jwtPassport = passport.use(new jwtStrategy(options, (jwt_payload, done) =>{
    Users.findById(jwt_payload._id, (err, user) =>{
        console.log('login err', err)
        if(err){return done(err, false)}
        else if(user){return done(null, user)}
        else{return done(null, false)}
    })
}))

exports.verifyUser = passport.authenticate('jwt', {session: false})

exports.verifyAdmin = (req, res, next) =>{
    if(req.user.admin){
        return next()
    }
    const err = new Error('you are not authorized to do this operation')
    err.status = 403
    next(err)
}

exports.googlePassport = async(accessToken, done) => {
    const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

    const profile = await res.json()
    console.log(profile)
    console.log(profile)
    Users.findOne({googleId: profile.id}, (err, user) =>{
        if(err){return done(err, false)}
        if(user != null){return done(null, user)}
        else{
            user = new Users({
                username: profile.email,
                googleId: profile.id,
                fullname: profile.name,
                image: profile.picture
            })
            user.save((err, user) =>{
                if(err){return done(err, false)}
                else{return done(null, user)}
            })
        }
    })
}

exports.facebookPassport = passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_APPSECRET,
}, (accessToken, refreshToken, profile, done) =>{
    Users.findOne({facebookId: profile.id}, (err, user) =>{
        if(err){return done(err, false)}
        if(user != null){return done(null, user)}
        else{
            User = new Users({
                username: profile._json.email,
                facebookId: profile.id,
                fullname: profile._json.name
            })
            console.log(User)
            User.save((err, user) =>{
                if(err){return done(err, false)}
                else{return done(null, user)}
            })
        }
    })
}))

exports.twitterPassport = passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_APPID,
    consumerSecret: process.env.TWITTER_APPSECRET,
}, (accessToken, refreshToken, profile, done) =>{
    Users.findOne({twitterId: profile.id}, (err, user) =>{
        if(err){return done(err, false)}
        if(user != null){return done(null, user)}
        else{
            user = new Users({
                email: profile.email,
                twitterId: profile.id,
                firstname: profile.name.givenName+' '+profile.name.familyName,
            })
            user.save((err, user) =>{
                if(err){return done(err, false)}
                else{return done(null, user)}
            })
        }
    })
}))
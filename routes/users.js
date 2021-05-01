var express = require('express');
var bodyParser = require('body-parser')
var Users = require('../models/users')
var passport = require('passport')
var authentication = require('../authentication')
var crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const sendEmail = require('./sendEmail')
const UploadImage = require('../upload');
const { token } = require('morgan');

const upload = UploadImage('user')
var UsersRouter = express.Router();
UsersRouter.use(bodyParser.json())

/* GET users listing. */
.options('*', (req, res) => {res.sendStatus(200)})

UsersRouter.get('/', authentication.verifyUser,authentication.verifyAdmin, (req, res, next) =>{
  
  Users.find({})
  .then(users =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(users)
  })
  .catch(err => next(err))
});

UsersRouter.route('/signup')

.post(upload.single('image'), (req, res, next) =>{
  if(req.file){
    var image = `${req.protocol}://${req.get('host')}/${req.file.destination}/${req.file.filename}`
  }
  Users.register(new Users({username: req.body.username}), req.body.password, (err, user) => {
  if(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({err: err});
  }
  else {
    if (req.body.fullname){user.fullname = req.body.fullname}
    if (req.body.phone){user.phone = req.body.phone}
    if (image){user.image = image}
    user.save((err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
        return ;
      }
      passport.authenticate('local')(req, res, () => {
        const token = authentication.getToken({_id: req.user._id})
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token, ...req.user._doc, status: 'Registration Successful!'});
      })
    })
  }
})
})

UsersRouter.route('/signin')
//passport will try to authenticate if fail will handle the error
.post(passport.authenticate('local'), (req, res) =>{
  const token = authentication.getToken({_id: req.user._id})
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({success: true, token: token, status:'you are loggedin successfully'})
})

UsersRouter.route('/logout')

.get((req, res, next) =>{
  req.logout()
  res.status(200).json({success: true, message:"you are logged out"})
})


UsersRouter.route('/google/token')
.get((req, res) =>{
  authentication.googlePassport(req.query.access_token, (err, user) =>{
    if(err){
      res.status(400).json({success: false, error:err.message})
    }
    else{
      const token = authentication.getToken({_id: user._id})
      res.sendStatus = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({success: true, token: token, status: 'you logged in with google successfully'}) 
    }
  })
})


UsersRouter.route('/facebook/token')
.get(passport.authenticate('facebook-token'), (req, res) =>{
  console.log(req)
  if(req.user){
    const token = authentication.getToken({_id: req.user._id})
    res.sendStatus = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success: true, token: token, status: 'you logged in with facebook successfully'})    
  }
})

UsersRouter.route('/twitter/token')
.get(passport.authenticate('twitter-token'), (req, res) =>{
  console.log(req)
  if(req.user){
    const token = authentication.getToken({_id: req.user._id})
    res.sendStatus = 200
    res.setHeader('Content-Type', 'application/json')
    res.json({success: true, token: token, status: 'you logged in with twitter successfully'})    
  }
})

UsersRouter.route('/checkjwt')
.get((req, res) =>{
  passport.authenticate('jwt', {session: false}, (err, user, info) =>{
    if(err){
      return next(err)
    }
    else if(!user){
      res.sendStatus = 401
      res.setHeader('Content-Type', 'application/json')
      res.json({status: 'invalid token', success: false, error: info})
    }
    else {
      res.sendStatus = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({status: 'valid token', success: true, user: user})
    }
  })(req, res)
})

UsersRouter.route('/resetpassword')

  .post( async (req, res, next) => {

     try{
      const random = Math.floor(Math.random() * 1000000)
      const token = bcryptjs.hashSync(String(random), 10)
      Users.findOne({username:req.body.username})
      .then(User => {
        if (User != null) {
          User.resetToken = token
          User.expireToken = Date.now() + 3600000
          return User.save()
            .then(result => 
              sendEmail({
                to: req.body.username,
                from: 'tameradel209@gmail.com',
                subject: 'password reset',
                text: "Hello world?",
                html:
                  `
                    <p>Your requested for password reset</p>
                    <h5>please use this code : ${random}</h5>
                    <h5>to reset your password</h5>
                  `
              })
            )
            .then(info => res.status(200).json({ message: 'check your email' }))
        }
        return res.status(404).json({err:'username is not found'})
      })
    }
     catch (err){ res.status(500).json({err:err.message}) }
  })

  .put( async (req, res, next) => {

    try {
      const User = await Users.findOne({username:req.body.username})

      if (User != null) {
        if (bcryptjs.compareSync(req.body.code, User.resetToken)){
          if (User.expireToken > Date.now()){
            await User.setPassword(req.body.password);
            User.resetToken=null;
            User.expireToken=null;
            User.save((err, user) => err ? res.status(500).json({err:err.message}): res.status(200).json(user))            
          }
          else{
            return res.status(403).json({ mesage: 'code is expired' })
          }
        }
        else{
          return res.status(403).json({mesage:'code is not right'})
        }
      }
      else { res.status(404).json({err:'user not found'}) }
    }
    catch (err) { res.send(err) }

  })

UsersRouter.route('/:userId')

  .put(authentication.verifyUser, upload.single('image'), async (req, res, next) => {
    console.log(req.user._id)
    try {
      if (req.file) {
        var image = `${req.protocol}://${req.get('host')}/${req.file.destination}/${req.file.filename}`
      }
      
      const User = await Users.findById(req.user._id)
      
      if (User != null) {
        Users.findByIdAndUpdate(req.user._id, {
          $set: {...req.body, image}}, { new: true })
          .then(user => res.status(200).json(user))
      }
      else { res.status(404).json({}) }
    }
    catch (err) { res.send(err.message) }

  })

  .delete((req, res, next) => {
    Users.findByIdAndDelete(req.user._id)
      .then(user => {
        if (user) {
          res.status(200).json(user)
        }
        else {
          res.status(404).json({})
        }
      })
      .catch(err => res.send(err.message))
  })

module.exports = UsersRouter;

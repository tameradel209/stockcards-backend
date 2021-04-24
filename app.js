//https://stockcardsbackend.herokuapp.com/api/v1

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose')
var passport = require('passport')
require('dotenv/config')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var occasionRouter = require('./routes/occasions')
var sectorRouter = require('./routes/sectors')
var packageRouter = require('./routes/packages')
var infoRouter = require('./routes/information')
var cardRouter = require('./routes/cards')
var userfavoritesRouter = require('./routes/userFavorites')
var userPackagesRouter = require('./routes/userPackages')
var userOrdersRouter = require('./routes/userOrders')
var offerRouter = require('./routes/offers')
var advantageRouter = require('./routes/advantages')
var userCartRouter = require('./routes/cart')
var imagesRouter = require('./routes/images')
var authentication = require('./authentication')

var app = express();

const mongoUrl = process.env.MONGODB_URL
const api = process.env.API_URL

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'stockcards'
})
  .then(db => console.log('successfully connected to the database...'))
  .catch(err => console.log('Error:', err.message))

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

app.use(api + '/', indexRouter);
app.use(api + '/users', usersRouter);
app.use(api + '/occasions', occasionRouter)
app.use(api + '/sectors', sectorRouter)
app.use(api + '/packages', packageRouter)
app.use(api + '/info', infoRouter)
app.use(api + '/cards', cardRouter)
app.use(api + '/favorites', userfavoritesRouter)
app.use(api + '/userpackages', userPackagesRouter)
app.use(api + '/orders', userOrdersRouter)
app.use(api + '/offers', offerRouter)
app.use(api + '/advantages', advantageRouter)
app.use(api + '/images', imagesRouter)
app.use(api + '/cart', userCartRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

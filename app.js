var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
mongoose.connect('mongodb://heroku_xb4vlx5k:bakrvris7esr5jf5tdqminavrh@ds051334.mongolab.com:51334/heroku_xb4vlx5k');
require('./models/customers.js');
require('./models/orders.js');
require('./models/pmethods.js');
require('./models/products.js');
require('./models/users.js');
var shippingLabelService = require('./services/createShippingLabels.js');
var checkShipStatus = require('./services/checkShipStatus.js');
var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'whatever',resave:true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//recurring services
//check find orders that need labels, create them, and change status...
shippingLabelService.createShippingLabel();

//check on orders that have been printed and see if they have shipped out yet..
checkShipStatus.checkShipStatusTest();
checkShipStatus.checkShipStatusLive();

module.exports = app;

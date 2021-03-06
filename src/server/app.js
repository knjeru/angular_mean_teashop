// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var protectApi = express.Router();
var config = require('./config');

// *** routes *** //
var userApi = require('./routes/userApi.js');
var catalogApi = require('./routes/catalogApi.js');
var authorization = require('./routes/authorization.js');

// *** JSON Web Token Validation *** //
protectApi.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // If request includes a token check to see if its valid
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.token, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good call the next middleware for the route
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return a response response to deny the user access
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

// *** express instance *** //
var app = express();

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.get('/', function(req,res,next) {
    res.sendFile(path.join(__dirname, '../client/app', 'index.html'));
});
app.use('/catalog', catalogApi);
app.use('/auth', authorization);
app.use('/api', protectApi);
app.use('/api/users', userApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;

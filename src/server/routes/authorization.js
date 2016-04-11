var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../../../models/userModel.js');

function hashing (password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}

// Create Email and Password Account
router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // check if email is unique
  User.findOne({ email: req.body.email })
    .then(function(data){
      // if email is in the database send an error
      if(data) {
          res.json('Email already exist!');
          return res.redirect('/register');
      } else {
        // hash and salt the password
        var hashedPassword = hashing(password);
        // if email is not in the database insert it
        new User({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          password: hashedPassword,
          address: {
            street: req.body.street,
            apt: req.body.apt,
            zipCode: req.body.zipcode,
            state: req.body.state,
            country: req.body.country
          }
        })
        .saveQ()
        .then(function(data) {
          res.json('Welcome!');
        })
        .catch(function(err) {
          return res.json('crap');
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

// Login with email and password

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: req.body.email })
      .then(function(data) {
        // email does not exist. return error.
        if (!data) {
          return res.send('Incorrect email.');
        }
        var user = data;
        // email found but do the passwords match?
        if (comparePassword(password, user.password)) {
          var token = jwt.sign(user, 'superSecret', {
            expiresIn: "10h" // expires in 10 hours;
          });
          res.json({
            success: true,
            user: user.id,
            token: token
          });
        } else {
          // passwords don't match! return error
          return res.send('Incorrect password.');
        }
      })
      .catch(function(err) {
        console.log(err);
        // issue with database query
        return res.send('Incorrect email and/or password.');
      });
});

module.exports = router;

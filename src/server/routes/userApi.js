var express = require('express');
var router = express.Router();
var User = require('../../../models/userModel.js');
var Catalog = require('../../../models/catalogModel.js');

/* Find All users */
router.get('/', function(req,res,next) {
  User.find()
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json({
      status: 500,
      message: err
    });
  });
});

/* Add New User */
router.post('/', function(req,res,next) {
  new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
  .saveQ()
  .then(function(user) {
    res.json(user);
  })
  .catch(function(err) {
    res.json({
      status: 500,
      message: err
    });
  });
});

/* Get user by ID */
router.get('/:id', function(req,res,next) {
  User.findByIdQ(req.params.id)
  .then(function(user) {
    res.json(user);
  })
  .catch(function(err) {
    res.json({
      status: 500,
      message: err
    });
  });
});

/* Update Current User Profile */
router.put('/:id/edit', function(req,res,next) {
  User.findByIdQ(req.params.id)
  .then(function(user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user
      .saveQ()
      .then(function(userUpdated) {
        res.json(userUpdated);
      })
      .catch(function(err) {
        res.json({
          status: 500,
          message: err
        });
      });
  });
});

/* Add new item to user's cart */
router.post('/:id/cart/new', function(req,res,next) {
  User.findByIdAndUpdate(req.params.id,
    {
      $push: {
        "cart": {
          itemID: req.body.itemID
        }
      }
    },
    {safe: true, upsert: true, new: true},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

/* Delete item from user's cart */
router.delete('/:id/cart/delete', function(req,res,next) {
  User.findByIdAndUpdate(req.params.id,
    {
      $pull: {
        "cart": {
          _id: req.body.id
        }
      }
    },
    {multi: true},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

/* Post order to user history */
router.post('/:id/order/new', function(req,res,next) {
  User.findByIdAndUpdate(req.params.id,
    {
      $push: {
        order: {
          items: req.body.items,
          taxes: req.body.taxes,
          shipping: req.body.shipping,
          grandTotal: req.body.total
        }
      }
    },
    {safe: true, upsert: true, new: true},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

/* Pull all items from cart array when user confirms order */
router.post('/:id/order/confirm', function(req,res,next) {
  User.findByIdAndUpdate(req.params.id,
    {
      $pull: {
        cart: {
          orderPlaced: req.body.order
        }
      }
    },
    {multi: true},
    function(err, user) {
      if (err) {
        res.json({
          status: 500,
          message: err
        });
      } else {
          res.json(user);
      }
    });
});

/* Delete A user */
router.delete('/:id/delete', function(req,res,next) {
  User.findByIdAndRemoveQ(req.params.id)
  .then(function(data) {
    res.json({
      status: 200,
      message: 'User Removed'
    });
  })
  .catch(function(err) {
    res.json({
      status: 500,
      message: err
    });
  });
});


module.exports = router;

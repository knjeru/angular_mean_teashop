var express = require('express');
var router = express.Router();
var Catalog = require('../../../models/catalogModel.js');


router.get('/', function(req,res,next) {
  Catalog.find()
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.get('/:id', function(req,res,next) {
  Catalog.findByIdQ(req.params.id)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;

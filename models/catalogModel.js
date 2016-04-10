var mongoose = require('mongoose-q')();

/* Activate connection when seeding the database or adding a new item */
// mongoose.connect('mongodb://localhost/meantea');

var teaCatalogSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  caffeineScale: Number,
  price: Number,
  inStock: Boolean,
  rating: Number,
  imageUrl: String,
  __v: Number,
  categories: [String]
});

module.exports = mongoose.model('teaCatalog', teaCatalogSchema);

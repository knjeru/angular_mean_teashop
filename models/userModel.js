var mongoose = require('mongoose-q')();
mongoose.connect('mongodb://localhost/meantea');

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: Number,
  address: {
    street: String,
    apt: String,
    zipCode: Number,
    state: String,
    country: String
  },
  cart: [
    {
      itemID: [String],
      timestamp: {
        type: Date, default: Date.now
      },
      orderPlaced: {
        type: Boolean,
        default: false
      }
    }
  ],
  order: [
    {
      timestamp: {
        type: Date,
        default: Date.now
      },
        cart: [String],
        shipping: Number,
        taxes: Number,
        grandTotal: Number
    }
  ]
});

module.exports = mongoose.model('User', userSchema);

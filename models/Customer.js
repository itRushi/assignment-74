const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    // required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  trustScore: {
    type: Number,
    default: 5,
    min: 0,
    max: 10
  },
  creditLimit: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  itemDescription: {
    type: String,
    trim: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  frequency: {
    type: String,
    enum: ['bi-weekly', 'monthly'],
    required: true
  },
  interest: {
    type: Number,
    default: 0
  },
  graceDays: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  balance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);

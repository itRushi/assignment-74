const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repaymentSchema = new Schema({
  loan: {
    type: Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repayment', repaymentSchema);

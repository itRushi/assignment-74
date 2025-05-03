const express = require('express');
const Loan = require('../models/Loan');
const Customer = require('../models/Customer');
const auth = require('../middleware/authMiddleware');
const moment = require('moment');
const router = express.Router();

router.post('/newLoan', auth, async (req, res) => {
  try {
    const { customerId, amount, issueDate, dueDate, frequency, interestRate, graceDays } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(400).json({
      success: false,
      status: 400,
      msg: 'Customer not found'
    });

    const newLoan = new Loan({
      customerId,
      amount,
      issueDate,
      dueDate,
      frequency,
      interestRate,
      graceDays,
      balance: amount
    });

    await newLoan.save();
    return res.status(201).json({
      success: true,
      status: 201,
      newLoan
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      msg: 'Server error',
      error: err.message
    });
  }
});

router.get('/getLoan', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      status: 200,
      loans
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      msg: 'Server error',
      error: err.message
    });
  }
});

router.get('/overdue', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    const overdueLoans = loans.filter(loan => moment(loan.dueDate).isBefore(moment(), 'day') && loan.status === 'pending');

    overdueLoans.forEach(async (loan) => {
      loan.status = 'overdue';
      await loan.save();
    });

    return res.status(200).json({
      success: true,
      status: 200,
      overdueLoans
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      msg: 'Server error',
      error: err.message
    });
  }
});

module.exports = router;

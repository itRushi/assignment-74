const express = require('express');
const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:loanId/repayments', auth, async (req, res) => {
  try {
    const loanId = req.params;
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Loan not found'
      });
    }

    const { amount } = req.body;
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Repayment amount must be greater than 0'
      });
    }
    if (amount > loan.balance) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Repayment amount exceeds loan balance'
      });
    }

    const repayment = new Repayment({
      loanId: loan._id,
      amount,
      repaymentDate: Date.now()
    });

    await repayment.save();

    loan.balance -= amount;
    
    if (loan.balance <= 0) {
      loan.status = 'paid';
    }

    await loan.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: 'Repayment recorded successfully',
      repayment,
      loan
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      error: err.message
    });
  }
});

module.exports = router;

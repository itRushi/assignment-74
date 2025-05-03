const express = require('express');
const Customer = require('../models/Customer');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { name, phone, address, trustScore, creditLimit } = req.body;

    const newCustomer = new Customer({
      userId: req.user.id,
      name: name,
      phone: phone,
      address: address,
      trustScore: trustScore,
      creditLimit: creditLimit,
    });

    await newCustomer.save();
    return res.status(201).json({
      success: true,
      status: 200,
      newCustomer
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

router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      status: 200,
      customers
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

router.put('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        status: 404,
        msg: 'Customer not found or unauthorized'
      });
    }

    const { name, phone, address, trustScore, creditLimit } = req.body;

    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    customer.trustScore = trustScore || customer.trustScore;
    customer.creditLimit = creditLimit || customer.creditLimit;

    await customer.save();
    res.status(200).json({
      success: true,
      status: 200,
      updatedCustomer: customer
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

router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.userId.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        status: 404,
        msg: 'Customer not found or unauthorized'
      });
    }

    await customer.remove();
    return res.status(200).json({
      success: true,
      status: 200,
      msg: 'Customer removed'
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

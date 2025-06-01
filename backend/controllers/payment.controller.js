// controllers/payment.controller.js
const Payment = require('../models/Payment');
const Property = require('../models/Property');

exports.makePayment = async (req, res) => {
  try {
    const { propertyId, amount } = req.body;
    const buyerId = req.user;

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ msg: 'Property not found' });

    const salerId = property.salerId;

    const payment = await Payment.create({
      buyerId,
      salerId,
      propertyId,
      amount,
    });

    // Update property with buyer info and mark it sold
    property.isSale = true;
    await property.save();

    res.status(201).json({ msg: 'Payment successful and ownership transferred', data: payment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPaymentHistoryByBuyer = async (req, res) => {
  try {
    const buyerId = req.user;
    const payments = await Payment.find({ buyerId }).populate('propertyId').populate('salerId', 'name email');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPaymentHistoryBySaler = async (req, res) => {
  try {
    const salerId = req.user;
    const payments = await Payment.find({ salerId }).populate('propertyId').populate('buyerId', 'name email');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

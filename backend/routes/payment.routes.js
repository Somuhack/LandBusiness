const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const paymentController = require('../controllers/payment.controller');

// Make a payment
router.post('/pay', auth, paymentController.makePayment);

// Get buyer's payment history
router.get('/buyer/history', auth, paymentController.getPaymentHistoryByBuyer);

// Get saler's payment history
router.get('/saler/history', auth, paymentController.getPaymentHistoryBySaler);

module.exports = router;

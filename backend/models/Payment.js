const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    salerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{16}$/.test(v); // Only 16-digit numbers
        },
        message: 'Card number must be exactly 16 digits',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);

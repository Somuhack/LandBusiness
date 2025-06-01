// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    salerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Payment', paymentSchema);

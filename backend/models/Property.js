const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  salerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default:null
  },
  applyers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isSale: {
    type: Boolean,
    default: false
  },

  location: {
    type: String,
    required: true
  },
  khatianNo: {
    type: String,
    required: true,
    unique:true
  },
  documents: [{
    type: String
  }],
  amount: {
    type: Number,
    required: true
  },
  mauja: {
    type: String
  },
  area: {
    type: String
  },
  block: {
    type: String
  },
  ps: {
    type: String
  },
  dist: {
    type: String
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
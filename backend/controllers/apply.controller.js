// controllers/apply.controller.js
const Property = require('../models/Property');
const User = require('../models/User');
const fs = require('fs');

// 1. Add apply (user applies for a land)
exports.addApply = async (req, res) => {
  try {
    const { landId } = req.body;
    const userId = req.user;

    const property = await Property.findById(landId);
    if (!property) return res.status(404).json({ msg: 'Land not found' });

    if (property.applyers.includes(userId))
      return res.status(400).json({ msg: 'Already applied to this land' });

    property.applyers.push(userId);
    await property.save();

    res.status(200).json({ msg: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 2. Get all land applications by the current user
exports.getAllDetailsByApplyUserId = async (req, res) => {
  try {
    const userId = req.user;
    const lands = await Property.find({ applyers: userId }).populate('salerId', 'name email');
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// exports.getAllApplyByUserId = async (req, res) => {
//   try {
//     const userId = req.user;
//     const lands = await Property.find({ applyers: userId }).populate('salerId', 'name email');
//     res.status(200).json(lands);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// 3. Remove application
exports.removeApply = async (req, res) => {
  try {
    const { landId } = req.body;
    const userId = req.user;

    const property = await Property.findById(landId);
    if (!property) return res.status(404).json({ msg: 'Land not found' });

    property.applyers = property.applyers.filter(id => id.toString() !== userId);
    await property.save();

    res.status(200).json({ msg: 'Application removed' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 4. Get all applicants for a given land
exports.getAllApplyersDetails = async (req, res) => {
  try {
    const { landId } = req.params;
    const property = await Property.findById(landId).populate('applyers', 'name email');
    if (!property) return res.status(404).json({ msg: 'Land not found' });

    res.status(200).json(property.applyers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// 6. Get all lands where user is buyer
exports.getAllDetailsByBuyerId = async (req, res) => {
  try {
    const buyerId = req.user;
    const lands = await Property.find({ buyerId }).populate('salerId', 'name email');
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 7. Approve one user as the buyer
exports.approveOnlyOneAsBuyer = async (req, res) => {
  try {
    const { landId, buyerId } = req.body;
    const property = await Property.findById(landId);
    if (!property) return res.status(404).json({ msg: 'Land not found' });

    if (!property.applyers.includes(buyerId))
      return res.status(400).json({ msg: 'User has not applied to this land' });

    property.buyerId = buyerId;
    property.applyers = []; // Clear other applicants
    await property.save();

    res.status(200).json({ msg: 'Buyer approved successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getAllApplyersBySalerId = async (req, res) => {
  try {
    const { salerId } = req.params;

    const lands = await Property.find({ salerId })
      .populate('applyers', 'name email') // get applyers' details
      .select('location amount khatianNo applyers'); // you can add more fields as needed

    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
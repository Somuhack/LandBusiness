const express = require('express');
const router = express.Router();
const applyController = require('../controllers/apply.controller');
const auth = require('../middleware/auth.middleware');

// Apply for a land
router.post('/apply', auth, applyController.addApply);

// Get all lands a user applied to
router.get('/my-applications', auth, applyController.getAllDetailsByApplyUserId);

// Remove application from a land
router.delete('/remove-application', auth, applyController.removeApply);

// Get all applicants for a land (by land ID)
router.get('/applicants/:landId', auth, applyController.getAllApplyersDetails);

// Get all land details where user is the buyer
router.get('/my-buys', auth, applyController.getAllDetailsByBuyerId);

// Approve one user as buyer
router.post('/approve-buyer', auth, applyController.approveOnlyOneAsBuyer);

module.exports = router;

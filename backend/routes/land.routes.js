const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {
  addLand,
  deleteLand,
  getLandById,
  getLandBySellerId,
  getAllLands
} = require('../controllers/land.controller');

// Add land with multiple images
router.post('/add', auth, upload.array('documents', 5), addLand);

// Delete land
router.delete('/:id', auth, deleteLand);

// Get land by ID
router.get('/:id', getLandById);

// Get lands by seller (authenticated user)
router.get('/seller/own', auth, getLandBySellerId);

// Get all lands
router.get('/', getAllLands);

module.exports = router;

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');


// Apply for a land
router.post('/', contactController.submitContact);
router.get('/getall', contactController.getAllMessages);
module.exports = router;

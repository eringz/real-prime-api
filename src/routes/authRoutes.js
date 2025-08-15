const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

/**
 * ------------------------------------- AUTHENTICATION SECTION -------------------------------------
 */
router.post('/register', authController.register);



module.exports = router;

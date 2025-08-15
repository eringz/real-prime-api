const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * ------------------------------------- AUTHENTICATION SECTION -------------------------------------
 */
router.post('/register', authController.register);



module.exports = router;

import express from 'express'
const router = express.Router();
import authController from '../controllers/authController.js';

/**
 * ------------------------------------- AUTHENTICATION SECTION -------------------------------------
 */
router.post('/register', authController.register);



export default router;

import {Router} from 'express';
import {register, login, refresh, logout, googleLogin} from '../controllers/authController.js';
import {loginLimiter} from '../config/ratelimit.js';

const router = Router();

router.post('/register', register);
router.login('/login', loginLimiter, login);
router.post('/refresh', refresh); // users HTTPOnly cookie
router.post('/logout', logout);
router.post('/google', googleLogin); // expects {idToken}

export default router;

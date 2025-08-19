import express from 'express';
import {createUser, getUsers} from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {roleMiddleware} from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), createUser);
router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);

export default router;




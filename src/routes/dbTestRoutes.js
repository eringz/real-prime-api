import { Router } from 'express';
import { DbTestController } from '../controllers/dbTestController.js';

const router = Router();

router.get('/test', DbTestController.testConnection);

export default router;
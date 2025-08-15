import { Router } from 'express';
import { DbTestController } from '../controllers/dbTestController.js';

const router = Router();

router.get('/db-test', DbTestController.testConnection);

export default router;
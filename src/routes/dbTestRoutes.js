import { Router } from 'express';
import { DbTestController } from '../controllers/dbTestController';

const router = Router();

router.get('/db-test', DbTestcontroller);

export default router;
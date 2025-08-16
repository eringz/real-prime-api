import cors from 'cors';
import { ENV } from './env.js';

export const corsOptions = {
    origin: ENV.FRONTEND_ORIGIN,
    credentials: true
};


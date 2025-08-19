import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {corsOptions} from './config/cors.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import {errorHandler} from './middlewares/error.js';

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', (req, res) => res.json({message: 'Welcome to Real Prime API'}));
/**
 * 
 */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);


export default app;
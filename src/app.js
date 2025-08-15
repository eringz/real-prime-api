import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

/**
 * ------------------------------------- ROUTES SECTION -------------------------------------
 */
app.use('/api/auth', authRoutes);
app.use('/api/db', dbTestRoutes);


/**
 *  ------------------------------------- URL SECTION -------------------------------------
 */
app.get('/', (req, res) => {
    res.send('Real Prime is running!');
});

export default app;
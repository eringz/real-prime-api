const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

/**
 * ------------------------------------- ROUTES SECTION -------------------------------------
 */
app.use('/api/auth', authRoutes);


/**
 *  ------------------------------------- URL SECTION -------------------------------------
 */
app.get('/', (req, res) => {
    res.send('Real Prime is running!');
});

export default app;
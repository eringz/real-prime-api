require('dotenv').config();
const app = require('./src/app');
const cors = require('cors');

// Middleware
app.use(cors());

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



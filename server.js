import 'dotenv/config';
import app from './src/app.js';
// import cors from 'cors';


// // Middleware
// app.use(cors());

// Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import signupRoutes from './routes/signupRoutes.js'; // Corrected path to lowercase 'signupRoutes'

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies with a limit of 50MB

// Define routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/signup', signupRoutes);

// Test route
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from the server!',
  });
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
    process.exit(1);
  });

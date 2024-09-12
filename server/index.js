import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import signupRoutes from './routes/signupRoutes.js';
import loginRoutes from './routes/loginRoutes.js'; // Import login routes

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json({ limit: '50mb' }));

// Use routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/signup', signupRoutes);
app.use('/api/v1/login', loginRoutes); // Add login route

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from the server!',
  });
});

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

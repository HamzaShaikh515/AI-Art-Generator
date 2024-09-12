import express from 'express';
import bcrypt from 'bcrypt'; // Use bcrypt for password hashing/comparison
import jwt from 'jsonwebtoken'; // For JWT token generation
import User from '../mongodb/models/signup.models.js'; // Ensure this path is correct for your User model

const router = express.Router();

// POST request to handle login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token after successful login
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // Make sure you have this in your .env file
      { expiresIn: '1h' } // Token expiration
    );

    // Send success response with token and user details
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

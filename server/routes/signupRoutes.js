import express from 'express';
import { User } from '../mongodb/models/signup.models.js'; // Adjust the import path

const router = express.Router();

// Signup Route
router.post('/', async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Validate input data
    if (!username || !email || !fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, fullName, password });
    await newUser.save();

    // Generate JWT token after successful signup
    const token = newUser.generateToken()

    res.status(201).json({
      message: 'Signed Up successfully! Redirecting to home.',
      token // Return the token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token after successful login
    const token = user.generateToken();

    res.status(200).json({
      message: 'Login successful',
      token // Return the token to the client
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

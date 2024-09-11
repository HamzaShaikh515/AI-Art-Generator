// routes/auth.js
import express from 'express';
import { User } from '../mongodb/models/signup.models.js'; // Adjust the import path
import jwt from 'jsonwebtoken';

const router = express.Router();

// Signup Route
router.post('/', async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Validate input data (you might want to add more validation here)
    if (!username || !email || !fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, fullName, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async(req,res) => {
  const {username, password} = req.body;

  if(!username || !password) {
    return res.status(404).json({message: 'All field are required'})
  }

 const user = await User.findOne({
   username
});

if(!user){
  return res.status(404).json({message: "User does not exist"})
}

isPasswordCorrect = await user.isPasswordCorrect(password)
if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }
})



export default router;

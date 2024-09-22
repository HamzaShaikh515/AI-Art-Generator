import express from 'express';
import User from '../mongodb/models/signup.models.js'; // Assuming the User model is stored in this path
import Post from '../mongodb/models/post.model.js'; // Assuming the Post model exists in this path
import authMiddleware from '../middleware/authMiddleware.js'; // Your JWT token middleware

const router = express.Router();

// Profile Route to get user details and posts
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch user details (excluding password)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch user's posts (assuming `author` references the user in the post schema)
    const posts = await Post.find({ author: req.user.id });

    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

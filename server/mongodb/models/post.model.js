import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  prompt: { 
    type: String, 
    required: true 
  },
  photo: { 
    type: String, 
    required: true 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  likes: {
    type: Number,
    default: 0, // Default value to start with 0 likes
  },
  views: {
    type: Number,
    default: 0, // Default value to start with 0 views
  },
  comments: [{
    type: String, // You can expand this to store more complex comment structures
  }],
}, { timestamps: true });

const PostSchema = mongoose.model('Post', postSchema);

export default PostSchema;

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true, // The content of the comment
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  likes: {
    type: Number,
    default: 0, // Default to 0 likes for new comments
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the date when the comment is created
  },
}, { timestamps: true }); // Use timestamps to track createdAt and updatedAt for comments

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
  comments: [commentSchema], // Embedding the commentSchema for each comment
}, { timestamps: true });

const PostSchema = mongoose.model('Post', postSchema);

export default PostSchema;

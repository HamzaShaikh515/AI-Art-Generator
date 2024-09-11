import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
   try {
       console.log('MongoDB URI:', process.env.MONGODB_URI);  // Debugging: Check if the URI is loaded
       const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
       console.log(`Successfully connected with Mongodb ${connectionInstance.connection.host}`);
   } catch (error) {
       console.log("Couldn't able to connect with mongodb", error);
       process.exit(1);
   }
};

export default connectDB;


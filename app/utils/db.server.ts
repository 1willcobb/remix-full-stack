import mongoose from 'mongoose';

const MONGO_URI = process.env.DATABASE_URL || "mongodb://localhost:27017/socialdb";

// || "mongodb://localhost:27017/socialdb";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

export default connectDB;
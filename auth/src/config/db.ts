import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // fatal hata olursa uygulamayı kapat
  }
};

export default connectDB;

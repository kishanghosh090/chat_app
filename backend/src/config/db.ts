import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

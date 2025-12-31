import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Mongo DB connection successful");
  } catch (error) {
    console.log("Mongo DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;

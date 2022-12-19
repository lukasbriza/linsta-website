import mongoose from "mongoose";
import { withErrorHandler } from "./withErrorHandler";
import { DatabaseError } from "./errorTypes";

const DB_URI = process.env.MONGO_URI;

const connectMongo = async () => {
  try {
    const db = await mongoose.connect(DB_URI!);
    return db;
  } catch (error) {
    if (error instanceof Error) {
      return new DatabaseError(error);
    }
    throw error;
  }
};

export const connectDB = connectMongo;

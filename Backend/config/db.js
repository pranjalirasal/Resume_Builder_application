import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file variables

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.error("DB Connection Error:", err));
};

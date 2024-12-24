import mongoose from "mongoose";

const dbPassword = process.env.dbPassword;

const uri = `mongodb+srv://devindubin:${dbPassword}@jobtailor.sxdti.mongodb.net/?retryWrites=true&w=majority&appName=JobTailor`;

const dbConnect = async () => {
  mongoose
    .connect(uri, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default dbConnect;

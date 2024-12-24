import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
});

export const User = mongoose.model("User", userSchema);
const templateResumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  name: String,
  tags: [String],
  data: String, // store text based data
});

export const Resume = mongoose.model("Resume", templateResumeSchema);

export const loadResume = async (fileId) => {
  let document;
  if (fileId) {
    document = await Resume.findById(fileId, "data").exec();
  } else {
    document = await Resume.findOne({});
  }

  return document;
};

import "dotenv/config";
import express from "express";
import generateChat from "./openai-llm.js";
import { formatAndSaveResponse, extractText } from "./docx.js";
import { User, Resume } from "./db/db-set-up.js";
import dbConnect from "./db/db-core.js";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 5000;

await dbConnect();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//TODO: choose better endpoint name
app.post("/chat", async (req, res) => {
  let jobTitle;
  let jobDescription;
  let fileId;
  if (req.body.jobTitle && req.body.jobDescription) {
    jobTitle = req.body.jobTitle;
    jobDescription = req.body.jobDescription;
  } else {
    jobTitle = "Test Title";
    jobDescription = "Test Description";
  }
  if (req.body.fileId) {
    fileId = fileId;
  } else {
    fileId = undefined; //TODO: this is nonsense
  }

  const chatResults = await generateChat({ jobTitle, jobDescription, fileId });

  const blob = await formatAndSaveResponse(chatResults);

  res.setHeader("Content-Type", blob.type);
  res.setHeader("Content-Length", blob.size);

  // Required for sending blob to client for some reason
  //TODO: look into this
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.end(buffer);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const text = await extractText(req.file);
  const newUpload = new Resume({
    userId: "67673a49025010b17c9e76af", // first test users, chosen at random
    data: text,
    name: req.file.originalname,
  });
  await newUpload.save();

  res.send(newUpload._id);
});

//TODO: Mark for delete
app.post("/make-test-user", async (req, res) => {
  const newUser = new User({ name: "Test", email: "test@test.com" });
  await newUser.save();
  res.sendStatus(200);
});

//TODO: Mark for delete
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//TODO: Mark for delete
app.get("/resumes", async (req, res) => {
  const resumes = await Resume.find();
  res.send(resumes);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

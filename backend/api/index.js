import "dotenv/config";
import express from "express";
import generateChat from "../server/openai-llm.js";
import { formatAndSaveResponse, extractText } from "../server/docx.js";
import { User, Resume } from "../server/db/db-set-up.js";
import dbConnect from "../server/db/db-core.js";
import cors from "cors";
import multer from "multer";
import logger from "../logger.js";

const app = express();
const port = 3000;

try {
  await dbConnect();
  logger.info("Connected to database");
} catch (e) {
  logger.error("Database connection failed", e);
  process.exit(1);
}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  logger.log(req.method, req.hostname, req.path, req.time);
  next();
});

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

  try {
    const chatResults = await generateChat({
      jobTitle,
      jobDescription,
      fileId,
    });

    const blob = await formatAndSaveResponse(chatResults);

    res.setHeader("Content-Type", blob.type);
    res.setHeader("Content-Length", blob.size);

    // Required for sending blob to client for some reason
    //TODO: look into this
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.status(200).end(buffer);
  } catch (error) {
    logger.error("Error processing chat request:", error);
  }
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

const server = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

export default server;

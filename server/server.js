import "dotenv/config";
import express from "express";
import generateChat from "./openai-llm.js";
import runDocx, { saveFile, formatAndSaveResponse } from "./docx.js";
console.log(process.env);
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate-letter", (req, res) => {
  const data = req.body;
  console.log(data);
  runDocx();

  res.send();
});

app.post("/chat", async (req, res) => {
  let jobTitle;
  let jobDescription;
  if (jobTitle && jobDescription) {
    jobTitle = req.body.jobTitle;
    jobDescription = req.body.jobDescription;
  } else {
    jobTitle = "Test Title";
    jobDescription = "Test Description";
  }

  const chatResults = await generateChat({ jobTitle, jobDescription });
  // console.log(chatResults);
  formatAndSaveResponse(chatResults);

  // runDocx(chatResults);
  res.send(200);
});

const processTextIntoDocument = (text) => {};

const sendDataToLLM = (jobDetails) => {
  //Assuming jobDetails is just a text blob I would like submitted to the AI
};

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

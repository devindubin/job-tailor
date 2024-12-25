import { response } from "express";
import OpenAI from "openai";

import { loadResume } from "./db/db-set-up.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateChat = async ({ jobTitle, jobDescription, fileId }) => {
  const referenceDocument = await loadResume(fileId);
  const systemPrompt = `You are an assistant that generates cover letters.`;
  const userPrompt = ` Use the provided job title, description, and template resume to construct your cover letters.
Job description:
${jobDescription}
Job title:
${jobTitle}
Reference Resume:
${referenceDocument}


`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  return completion.choices[0].message;
};

// TODO: Figure out upload file workflow
/*
1) User selects file and clicks upload
2) File is uploaded to OpenAI and saved as a vector store (VECTOR STORE ID)
3) Thread is destroyed after each run? OR after a session
*/

export const uploadFile = () => {
  // const url =
};

export default generateChat;

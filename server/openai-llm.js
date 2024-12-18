import { response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateChat = async ({ jobTitle, jobDescription }) => {
  const systemPrompt = `You are an assistant the generates cover letters. Write a cover letter for any provided job title and job description. Only return the body of the letter. Format the letter to match the output format.

Job description:
[Provided Job Description]

Output format:
Document Title: [Title]
Paragraph text...

`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content: systemPrompt,
      },
      {
        role: "user",
        content: `Write a cover letter for a position titled ${jobTitle}. The job description is ${jobDescription}`,
      },
    ],
  });

  return completion.choices[0].message;
};

export default generateChat;

import fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

import mammoth from "mammoth";

export const formatAndSaveResponse = async (response) => {
  const content = response.content;
  const childArray = [];
  console.log(content);
  const lines = content.split("\n");
  lines.map((line) => {
    childArray.push(new Paragraph({ children: [new TextRun(line.trim())] }));
  });

  const doc = new Document({
    sections: [{ properties: {}, children: childArray }],
  });

  const data = await Packer.toBlob(doc);
  console.log("This is blob from formatandSaveResponse", data);
  return data;
};

export const extractText = async (fileBuffer) => {
  switch (fileBuffer.originalname.split(".").pop().toLowerCase()) {
    case "docx":
      return mammoth
        .extractRawText({ buffer: fileBuffer.buffer })
        .then(function (result) {
          let text = result.value; // The raw text
          let messages = result.messages;
          return text;
        })
        .catch(function (error) {
          console.error(error);
        });
      break;
    case "pdf":

    default:
      console.log("Unknown file type");
  }
};

import fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

//TODO: save content as word document
// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section

/*
[Your Name][Your Address][City, State, ZIP Code][Your Email Address][Your Phone Number][Date]

[Hiring Manager's Name][Company Name][Company Address][City, State, ZIP Code]

Dear [Hiring Manager's Name],

I am excited to apply for the [Position Name] at [Company Name]. With my background in [Your Field/Industry] and proven experience in [relevant skills/experience], I am confident I can contribute meaningfully to [specific company goal or project].

[Insert a paragraph that highlights your relevant experience, accomplishments, or skills. Mention how they align with the role requirements and demonstrate your value to the company.]

[Insert a paragraph where you express enthusiasm about the company's mission, values, or recent projects. Connect your passion or skills with what the company stands for.]

I would welcome the opportunity to discuss how my background and qualifications make me a strong fit for this role. Thank you for considering my application, and I look forward to the possibility of contributing to [Company Name]'s continued success.

Sincerely,[Your Name]

*/

/*
[Your Name]
[Address]
[Email Address]
[Phone Number]
[Date]

[Hiring Managers Name]
[Company Name]
[Company Address]

[Letter Body]
[Sign Off]
*/

export const formatAndSaveResponse = (response) => {
  const content = response.content;
  const childArray = [];

  const lines = content.split("\n");
  lines.map((line) => {
    childArray.push(new Paragraph({ children: [new TextRun(line.trim())] }));
  });

  const doc = new Document({
    sections: [{ properties: {}, children: childArray }],
  });
  console.log(doc);
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Output.docx", buffer);
  });
};

export const saveFile = (data) => {
  fs.writeFile("sample.doc", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File Written Successfully");
  });
};

function runDocx() {
  const letterData = `I am writing to express my interest in the [Position Name] role at [Company Name]. With a strong background in [Your Field/Industry] and a passion for [specific area related to the job], I am confident in my ability to contribute to your team's success.

In my previous role as [Your Most Relevant Role], I successfully [mention a key achievement or responsibility that aligns with the job]. I am skilled in [list relevant skills or qualifications] and have a proven track record of [mention accomplishments or experience that show your ability to succeed in the role].

What excites me most about [Company Name] is [mention something specific about the company, such as their mission, culture, or recent accomplishments]. This aligns perfectly with my values and aspirations, and I am eager to bring my expertise to your team to help achieve [specific company goal or project].

I would welcome the opportunity to discuss how my background, skills, and enthusiasm make me a strong fit for this role. Thank you for considering my application, and I look forward to the opportunity to contribute to [Company Name]'s ongoing success.
`;
  // const doc = content;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun("Your Name")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Your Address")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("City, State, ZIP Code")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Your Email Address")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Your Phone Number")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Date")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Hiring Manager's Name")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Company Name")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("Company Address")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun("City, State, ZIP Code")],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [new TextRun("Dear Hiring Manager's Name,")],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "I am writing to express my interest in the [Position Name] role at [Company Name]. With a strong background in [Your Field/Industry] and a passion for [specific area related to the job], I am confident in my ability to contribute to your team's success."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "In my previous role as [Your Most Relevant Role], I successfully [mention a key achievement or responsibility that aligns with the job]. I am skilled in [list relevant skills or qualifications] and have a proven track record of [mention accomplishments or experience that show your ability to succeed in the role]."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "What excites me most about [Company Name] is [mention something specific about the company, such as their mission, culture, or recent accomplishments]. This aligns perfectly with my values and aspirations, and I am eager to bring my expertise to your team to help achieve [specific company goal or project]."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "I would welcome the opportunity to discuss how my background, skills, and enthusiasm make me a strong fit for this role. Thank you for considering my application, and I look forward to the opportunity to contribute to [Company Name]'s ongoing success."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun("Sincerely,")],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun("Your Name")],
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
  });

  // Done! A file called 'My Document.docx' will be in your file system.
}

export default runDocx;

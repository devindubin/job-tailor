/* global chrome */

import JobDescriptionPreview from "./components/JobDescriptionPreview";
import Button from "./components/Button";
import Output from "./components/Output";
import Header from "./components/Header";
import Window from "./components/Window";
import FileUpload from "./components/FileUpload";
import { useState, createContext } from "react";

// Context
export const JobContext = createContext("");

//TODO: Create header element
/*
Header needs a logo
maybe a reference to the file name of the reference resume
*/

function App() {
  // States
  const [jobDescription, setJobDescription] = useState("JD Placeholder");
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [fileError, setFileError] = useState();
  //state for finished cover letter before it can be downloaded
  const [bufferForDownload, setBufferForDownload] = useState();
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  // Button Functions
  const parseJobData = async () => {
    const descriptionLength = 100;
    try {
      //TODO: Handle possible error
      const { parsedJobDescription, parsedJobTitle, error } =
        await chrome.runtime.sendMessage({
          action: "parse-job-description",
          target: "content",
        });

      if (parsedJobDescription.length > descriptionLength) {
        const firstPart = parsedJobDescription.slice(0, descriptionLength / 2);
        const lastPart = parsedJobDescription.slice(
          parsedJobDescription.length - descriptionLength / 2,
          -1
        );

        setJobDescription(firstPart + " ... " + lastPart);
      } else {
        setJobDescription(parsedJobDescription);
      }
      setJobTitle(parsedJobTitle);
    } catch (error) {
      console.error(error);
    }
  };

  const generateDocument = async () => {
    const url = "http://localhost:5000/chat";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: {
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          fileId: uploadedFile,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      setBufferForDownload(blob);
      setDownloadDisabled(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const downloadLetter = () => {
    const url = window.URL.createObjectURL(bufferForDownload);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "placeholder.docx");

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setDownloadDisabled(true);
  };

  const testOnClick = (content) => {
    console.log(content);
    parseJobData();
  };

  const isdisabled = downloadDisabled ? true : false;

  return (
    <div className="App">
      <JobContext.Provider
        value={{
          jobDescription,
          jobTitle,
          parseJobData,
          file,
          setFile,
          uploadedFile,
          setUploadedFile,
          fileError,
          setFileError,
        }}
      >
        <Window>
          <Header />
          <JobDescriptionPreview />{" "}
          {/* Job description  preview should show the first and last 25 characters of the jd just to confirm it is reading the right content*/}
          <Button onClick={parseJobData} content="Parse Job Details" />{" "}
          {/* Locate description button */}
          <Button onClick={generateDocument} content="Generate Document" />{" "}
          {/* generate cover letter */}
          <Button
            disabled={isdisabled}
            onClick={downloadLetter}
            content="Download Letter"
          ></Button>
          {/* Listen for cover letter creation and link  when completed */}
          <FileUpload />
        </Window>
      </JobContext.Provider>
    </div>
  );
}

export default App;

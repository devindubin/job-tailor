import JobDescriptionPreview from "./components/JobDescriptionPreview";
import Button from "./components/Button";
import Output from "./components/Output";
import Header from "./components/Header";
import Window from "./components/Window";
import { useState, createContext } from "react";

// Context
export const JobContext = createContext("");

//TODO: Create header element
/*
Header needs a logo
maybe a reference to the file name of the reference resume
*/
//TODO: Call AI
/*
Extenion will need to interact with a seperate server to communicate with LLM API to protect keys
*/

//TODO: Generate letter button

function App() {
  // States
  const [jobDescription, setJobDescription] = useState("JD Placeholder");
  const [jobTitle, setJobTitle] = useState("");

  // Button Functions
  const parseJobData = async () => {
    const descriptionLength = 100;
    try {
      const { parsedJobDescription, parsedJobTitle, error } =
        await chrome.runtime.sendMessage({
          action: "parse-job-description",
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

  const testOnClick = (content) => {
    console.log(content);
    parseJobData();
  };

  const testScrapeJobDescription = () => {
    const data = document.querySelector("#header").textContent;
    setJobDescription(data);
  };

  //LLM Function
  const processDescription = () => {
    //send description and title to the llm
    // provide download link to response?
  };

  return (
    <div className="App">
      <JobContext.Provider value={{ jobDescription, jobTitle, parseJobData }}>
        <Window>
          <Header />
          <JobDescriptionPreview />{" "}
          {/* Job description  preview should show the first and last 25 characters of the jd just to confirm it is reading the right content*/}
          <Button onClick={parseJobData} content="Access main doc" />{" "}
          {/* Locate description button */}
          <Button
            onClick={testScrapeJobDescription}
            content="Access app doc"
          />{" "}
          {/* generate cover letter */}
          <Button onClick={testOnClick} content="Download Letter" />{" "}
          {/* Listen for cover letter creation and link  when completed */}
        </Window>
      </JobContext.Provider>
    </div>
  );
}

export default App;

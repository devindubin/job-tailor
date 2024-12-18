import React, { useContext } from "react";
import { JobContext } from "../App";

const JobDescriptionPreview = () => {
  const { jobDescription } = useContext(JobContext);

  return (
    <div className="job-description-preview__wrapper">
      <output className="job-description-preview__output">
        {jobDescription}
      </output>
    </div>
  );
};

export default JobDescriptionPreview;

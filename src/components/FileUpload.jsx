import React from "react";
import { useState, useContext } from "react";
import { JobContext } from "../App";

const FileUpload = () => {
  const {
    file,
    setFile,
    uploadedFile,
    setUploadedFile,
    fileError,
    setFileError,
  } = useContext(JobContext);

  const selectDocument = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadDocument = (event) => {
    event.preventDefault();
    const url = "http://localhost:5000/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    fetch(url, { method: "POST", body: formData })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUploadedFile(data);
      })
      .catch((error) => {
        setFileError(error);
      });
  };

  return (
    <>
      <form className="file-upload" onSubmit={uploadDocument}>
        <input
          type="file"
          name="resume"
          id="resume"
          onChange={selectDocument}
        />
        <button type="submit">Upload File</button>
      </form>
      <div>
        <p>{uploadedFile && `Resume content saved. ID: ${uploadedFile}`}</p>
        <p>
          {fileError && <span>Error uploading file: {fileError.message}</span>}
        </p>
      </div>
    </>
  );
};

export default FileUpload;

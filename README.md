# job-tailor

A chrome extension to tailor your resume to the job description.

## Improvements

### General Improvements

1. **Add Error Handling**: Ensure all asynchronous operations have proper error handling.
2. **Add Comments**: Add comments to explain the purpose of functions and complex logic.
3. **Write Specific Tests**: Increase test coverage by writing specific tests for each function and component.
4. **Refactor TODOs**: Address all TODO comments in the code.

### Backend Improvements

1. **server.js**

   - Add error handling for database connection.
   - Improve endpoint names for clarity.
   - Refactor the `/chat` endpoint to handle missing `fileId` properly.
   - Add comments to explain the purpose of each endpoint.
   - Write unit tests for each endpoint.

2. **db-core.js**

   - Add comments to explain the database connection logic.
   - Add error handling for database connection.

3. **docx.js**

   - Add comments to explain the purpose of each function.
   - Add error handling for file extraction and formatting.

4. **openai-llm.js**

   - Add comments to explain the purpose of each function.
   - Add error handling for OpenAI API calls.

5. **db-set-up.js**
   - Add comments to explain the purpose of each schema and function.
   - Add error handling for database operations.

### Frontend Improvements

1. **App.jsx**

   - Add comments to explain the purpose of each state and function.
   - Add error handling for `parseJobData` and `generateDocument` functions.
   - Write unit tests for each component and function.

2. **Button.jsx**

   - Add comments to explain the purpose of the component.
   - Write unit tests for the component.

3. **Header.jsx**

   - Add comments to explain the purpose of the component.
   - Write unit tests for the component.

4. **JobDescriptionPreview.jsx**

   - Add comments to explain the purpose of the component.
   - Write unit tests for the component.

5. **Output.jsx**

   - Add comments to explain the purpose of the component.
   - Write unit tests for the component.

6. **Window.jsx**

   - Add comments to explain the purpose of the component.
   - Write unit tests for the component.

7. **FileUpload.jsx**
   - Add comments to explain the purpose of the component.
   - Add error handling for file upload.
   - Write unit tests for the component.

### Configuration Improvements

1. **jest.config.js**

   - Ensure Jest configuration is consistent across frontend and backend.
   - Add comments to explain the purpose of each configuration option.

2. **webpack.config.js**
   - Add comments to explain the purpose of each configuration option.

### Documentation Improvements

1. **README.md**
   - Add detailed instructions for setting up and running the project.
   - Add instructions for running tests.
   - Add a section for known issues and TODOs.

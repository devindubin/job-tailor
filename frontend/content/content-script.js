chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let error;
  //TODO: what does ember52 mean and is this a consistent id?
  console.log("Message Received at Content Script", request);
  if (request.action === "parse-job-description") {
    const parsedJobTitle = document
      .querySelector('[class$="__job-title"]')
      .textContent.trimStart()
      .trimEnd();
    const parsedJobDescription = document
      .querySelector("#job-details .mt4")
      .textContent.trimStart()
      .trimEnd();
    if (!parsedJobDescription || !parsedJobTitle) {
      error = "Either job description or job title not found.";
    }

    console.log("JD: ", parsedJobDescription);
    console.log("JT: ", parsedJobTitle);
    console.log("Error:", error);

    sendResponse({ parsedJobDescription, parsedJobTitle, error });
  }
  return true;
});

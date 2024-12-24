chrome.manifest = chrome.runtime.getManifest();

let injectIntoTab = async (tab) => {
  let scripts = chrome.manifest.content_scripts[0].js;
  for (let i = 0; i < scripts.length; i++) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },

      files: [scripts[i]],
    });
  }
};

chrome.windows.getAll(
  {
    populate: true,
  },
  (windows) => {
    let i = 0,
      w = windows.length,
      currentWindow;
    for (; i < w; i++) {
      currentWindow = windows[i];
      let j = 0,
        t = currentWindow.tabs.length,
        currentTab;
      for (; j < t; j++) {
        currentTab = currentWindow.tabs[j];
        if (
          !currentTab.url.match(/(chrome|chome-extension):\/\//gi) &&
          currentTab.url.match(/https:\/\/www.linkedin.com\/.*/gi)
        ) {
          injectIntoTab(currentTab);
        }
      }
    }
  }
);

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    "Message Received at Service Worker File",
    JSON.stringify(request)
  );
  switch (request.target) {
    case "content":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Within Chrome Tabs Context");
        console.log(tabs);
        console.log(request);
        chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
          if (chrome.runtime.lastError) {
            console.log("Error: ", chrome.runtime.lastError);
            sendResponse({ error: chrome.runtime.lastError });
          } else {
            console.log(
              "The content script got the following message: " +
                JSON.stringify(response)
            );
            sendResponse(response);
          }
          return true;
        });
      });

    case "service":
      pass;
    default:
      console.error("Message Missing Target Value");
  }

  return true;
});

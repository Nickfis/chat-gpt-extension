let chatGptTab;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.chatGPTDone) {
    // var myAudio = new Audio();
    // myAudio.src =
    //   "https://upload.wikimedia.org/wikipedia/commons/5/55/En-us-house-noun.ogg";
    // myAudio.play();

    // Focus the tab
    chrome.tabs.update(sender.tab.id, { active: true });

    sendResponse({ status: "Notification shown" });
  }

  if (request.getActiveTab) {
    setChatGptTab();
  }

  if (request.setActiveTab) {
    chrome.tabs.update(chatGptTab.id, { active: true }, () => {
      console.log(`Switched back to ChatGPT Tab`);
    });
  }

  return true; // Indicate that you wish to send a response asynchronously
});

function setChatGptTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chatGptTab = tabs[0];
    }
  });
}

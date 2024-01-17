const messageInput = document.querySelector("textarea#prompt-textarea");
let sendButton = document.querySelector('button[data-testid="send-button"]');
sendButton.addEventListener("click", () => {
  startCheck();
});

function startCheck() {
  const intervalId = setInterval(() => {
    if (document.querySelector('button[data-testid="send-button"]')) {
      console.log("Chat gpt is done generating");
      clearInterval(intervalId);
      sendButton = document.querySelector('button[data-testid="send-button"]');
      const audio = new Audio(chrome.runtime.getURL("notification.mp3"));
      audio.play();
      chrome.runtime.sendMessage({ chatGPTDone: true });
    } else {
      console.log("Chat-gpt is still generating");
    }
  }, 1000);
}

if (messageInput) {
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      startCheck();
    }
  });
} else {
  console.error("Message input not found");
}

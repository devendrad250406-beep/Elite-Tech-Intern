chrome.tabs.onActivated.addListener(async (info) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url?.startsWith("http")) {
    let domain = new URL(tab.url).hostname;
    // Send data to our backend
    fetch("http://localhost:5000/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domain })
    }).catch(() => console.log("Backend not running yet"));
  }
});
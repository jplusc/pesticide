chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['pesticide-injector.js']
  }).then(() => {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle' });
  }).catch(err => console.error('Failed to inject content script:', err));
});

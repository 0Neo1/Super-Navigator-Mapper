chrome.action.onClicked.addListener((tab) => {
  // Call open first to satisfy user gesture timing
  chrome.sidePanel.open({ tabId: tab.id }).catch(() => {})
    .finally(() => {
      // Optionally configure after open; do not await before open
      chrome.sidePanel.setOptions({ tabId: tab.id, path: 'sidepanel.html', enabled: true }).catch(() => {});
    });
}); 

// Allow external open requests (from allowed extensions declared in manifest externally_connectable)
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== 'object') return;
  if (message.action === 'open' || message.action === 'openSidePanel' || message.action === 'toggle' || message.action === 'focus' || message.action === 'launch') {
    const openForTab = (tabId) => {
      // Open first within the same task for user gesture, then configure
      chrome.sidePanel.open({ tabId }).then(() => {
        sendResponse({ ok: true });
        chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true }).catch(() => {});
      }).catch((e) => {
        sendResponse({ ok: false, error: e?.message });
      });
    };

    if (sender.tab && sender.tab.id) {
      openForTab(sender.tab.id);
    } else {
      // Fallback: open side panel for current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs[0];
        if (tab && tab.id) openForTab(tab.id); else sendResponse({ ok: false });
      });
    }
    return true; // async
  }
});

// Receive request from content script (user gesture boundary) to open panel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'open-from-content') {
    const tabId = sender?.tab?.id;
    if (!tabId) { sendResponse(false); return; }
    // Open immediately in response to the content click
    chrome.sidePanel.open({ tabId }).then(() => {
      sendResponse(true);
      chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true }).catch(() => {});
    }).catch(() => sendResponse(false));
    return true; // async
  }
});
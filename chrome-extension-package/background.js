(() => {
  // Import tools.js
  importScripts("./tools.js");
  
  // Browser detection without sending to backend
  let browserType;
  (async function() {
    const userAgent = navigator.userAgent;
    if (navigator.brave && typeof navigator.brave.isBrave === "function") {
      if (await navigator.brave.isBrave()) return "Brave";
    }
    return /Edg\//.test(userAgent) ? "Edge" :
           /OPR\//.test(userAgent) ? "Opera" :
           /Vivaldi/.test(userAgent) ? "Vivaldi" :
           /Chrome\//.test(userAgent) ? "Chrome" :
           /Firefox\//.test(userAgent) ? "Firefox" :
           /Safari\//.test(userAgent) && /Version\//.test(userAgent) ? "Safari" :
           /MSIE /.test(userAgent) || /Trident\//.test(userAgent) ? "Internet Explorer" :
           "Other";
  })().then(type => {
    browserType = type;
  }).catch(e => {
    browserType = "none";
  });
  
  // Simple utility to find tabs
  const findTabsWithUrl = (baseUrl) => {
    return chrome.tabs.query({}).then(tabs => 
      tabs.filter(({url}) => url && url.startsWith(baseUrl)).map(t => t.id)
    );
  };
  
  // Find ChatGPT tabs
  const findChatGPTTabs = () => findTabsWithUrl("https://chatgpt.com");

  // Message handling
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { type, data } = message;
    
    console.log('Background received message:', { type, data: !!data, sender: sender.tab?.url });
    
    // Handle error reporting (locally logged only)
    if (type === "unhandled-error") {
      console.error("Extension error:", data);
      return true;
    }

    // Handle test request - always return true to enable features
    if (type === "test") {
      sendResponse({ result: true, value: btoa(JSON.stringify({time: Date.now()})) });
      return true;
    }
    
    // Always return true for login checks
    if (type === "login-check" || type === "getLoginInfo") {
      sendResponse(true);
      return true;
    }
    
    // Handle GA events (do nothing as we don't need analytics)
    if (type === "ga-event") {
      return true;
    }
    
    // Handle open side panel request from floating button
    if (type === "open-side-panel") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          const tab = tabs[0];
          if (tab.url && (tab.url.startsWith("https://chatgpt.com") || tab.url.startsWith("https://www.chatgpt.com"))) {
            chrome.sidePanel.open({ tabId: tab.id }).catch(e => {
              console.error("Failed to open side panel:", e);
            });
          }
        }
      });
      return true;
    }
    
    console.log('Unhandled message type:', type);
    return true;
  });
  
  // Extension installation handler
  chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        active: true,
        url: chrome.runtime.getURL("welcome.html")
      }).catch(e => console.error(e));
    }
  });

  // Handle extension icon clicks - open sidebar
  chrome.action.onClicked.addListener(async (tab) => {
    // Only activate on ChatGPT pages
    if (tab.url && (tab.url.startsWith("https://chatgpt.com") || tab.url.startsWith("https://www.chatgpt.com"))) {
      try {
        // Open the sidebar
        await chrome.sidePanel.open({ tabId: tab.id });
        
        // Also notify the content script that sidebar is opening
        chrome.tabs.sendMessage(tab.id, { 
          type: "sidebar-opened",
          tabId: tab.id 
        }).catch(e => {
          console.log("Could not send message to tab:", e);
        });
      } catch (error) {
        console.error("Failed to open sidebar:", error);
        
        // Fallback to old toggle sidebar functionality if sidePanel API fails
        chrome.tabs.sendMessage(tab.id, { type: "toggle-sidebar" }).catch(e => {
          console.log("Could not send message to tab:", e);
        });
      }
    }
  });
})();
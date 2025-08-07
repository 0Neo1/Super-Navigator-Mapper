(() => {
  // Import tools.js
  importScripts("./tools.js");
  
  // --- Google OAuth via chrome.identity + Firebase id_token exchange ---
  const OAUTH_SCOPES = "openid email profile";
  const CLIENT_ID = chrome.runtime.getManifest()?.oauth2?.client_id;
  
  function getRedirectUri() {
    // e.g., https://<EXTENSION_ID>.chromiumapp.org/provider_cb
    return chrome.identity.getRedirectURL("provider_cb");
  }
  
  function buildAuthUrl() {
    const redirectUri = getRedirectUri();
    const state = crypto.getRandomValues(new Uint32Array(4)).join(".");
    const nonce = crypto.getRandomValues(new Uint32Array(4)).join(".");
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", CLIENT_ID);
    url.searchParams.set("response_type", "token id_token");
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", OAUTH_SCOPES);
    url.searchParams.set("prompt", "consent");
    url.searchParams.set("state", state);
    url.searchParams.set("nonce", nonce);
    return url.toString();
  }
  
  async function startGoogleLogin(sendResponse) {
    try {
      const url = buildAuthUrl();
      chrome.identity.launchWebAuthFlow({ url, interactive: true }, (redirectedTo) => {
        if (chrome.runtime.lastError || !redirectedTo) {
          sendResponse({ error: chrome.runtime.lastError?.message || "Canceled" });
          return;
        }
        const hash = new URL(redirectedTo).hash.slice(1);
        const params = new URLSearchParams(hash);
        const idToken = params.get("id_token");
        const accessToken = params.get("access_token");
        if (idToken) {
          sendResponse({ id_token: idToken, access_token: accessToken });
        } else {
          sendResponse({ error: "No id_token returned" });
        }
      });
    } catch (e) {
      sendResponse({ error: e?.message || "auth_failed" });
    }
  }
  
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
    

    
    // Start Google OAuth flow and return id_token
    if (type === "start-google-login") {
      startGoogleLogin(sendResponse);
      return true; // keep port open for async response
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

  // Extension icon clicks are now disabled - sidebar can only be opened via floating button
  
  // Notify content scripts when extension is reloaded
  chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started, notifying content scripts...');
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && (tab.url.includes('chatgpt.com') || tab.url.includes('gemini.google.com'))) {
          chrome.tabs.sendMessage(tab.id, { type: 'extension-reloaded' }).catch(() => {
            // Ignore errors if content script is not ready
          });
        }
      });
    });
  });
  
  // Also notify on extension update
  chrome.runtime.onUpdateAvailable.addListener(() => {
    console.log('Extension update available, notifying content scripts...');
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url && (tab.url.includes('chatgpt.com') || tab.url.includes('gemini.google.com'))) {
          chrome.tabs.sendMessage(tab.id, { type: 'extension-reloaded' }).catch(() => {
            // Ignore errors if content script is not ready
          });
        }
      });
    });
  });
})();
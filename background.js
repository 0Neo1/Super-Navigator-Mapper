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

    // Open/Install Prompt Engine by ZeroEka
    if (type === 'open-prompt-engine') {
      const EXT_ID = 'enkgghbjjigjjkodkgbakchhflmkaphj';
      const STORE_URL = 'https://chromewebstore.google.com/detail/prompt-engine-by-zeroeka/enkgghbjjigjjkodkgbakchhflmkaphj';

      const openStore = () => {
        chrome.tabs.create({ url: STORE_URL, active: true }).finally(() => {
          sendResponse({ status: 'store_opened' });
        });
      };

      try {
        if (!chrome.management || !chrome.management.get) {
          // Fallback: try ping, otherwise open store page (avoid opening chrome://extensions)
          try {
            chrome.runtime.sendMessage(EXT_ID, { action: 'ping' }, (resp) => {
              if (resp && resp.success) {
                chrome.runtime.sendMessage(EXT_ID, { action: 'open' });
                sendResponse({ status: 'installed_opened' });
              } else {
                openStore();
              }
            });
          } catch (_) {
            openStore();
          }
          return true;
        }

        // Try to trigger for a specific extension instance
        const tryTriggerForExt = async (ext) => {
          if (!ext) { openStore(); return; }
          if (!ext.enabled) {
            openStore();
            return;
          }
          try {
            // Try multiple action names to maximize compatibility
            const getActiveTabId = () => new Promise((resolve) => {
              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                resolve((tabs && tabs[0] && tabs[0].id) ? tabs[0].id : null);
              });
            });
            const tryOpen = (action, tabId) => new Promise((res) => {
              try {
                const payload = tabId ? { action, tabId } : { action };
                chrome.runtime.sendMessage(ext.id, payload, (resp) => {
                  if (chrome.runtime.lastError) { res(false); return; }
                  // Treat ok:true or any response as success, since receiver may not set ok
                  res(resp === undefined ? true : !!(resp.ok ?? true));
                });
              } catch (_) { res(false); }
            });
            (async () => {
              const actions = ['open', 'openSidePanel', 'toggle', 'focus', 'launch'];
              let ok = false;
              const tabId = await getActiveTabId();
              for (const a of actions) { // try sequentially
                // eslint-disable-next-line no-await-in-loop
                ok = await tryOpen(a, tabId);
                if (ok) break;
              }
              // Only succeed when the side panel was actually triggered.
              // Do NOT open any full-page fallbacks to ensure UI stays as side panel only.
              sendResponse({ status: ok ? 'installed_opened' : 'installed_but_cannot_open' });
            })();
          } catch (e) {
            sendResponse({ status: 'installed_but_cannot_open' });
          }
        };

        chrome.management.getAll((list) => {
          if (chrome.runtime.lastError || !Array.isArray(list)) { openStore(); return; }
          // Collect all plausible ZeroEka Prompt Engine candidates
          const candidates = list.filter(x => (
            x.id === EXT_ID || /zeroeka/i.test(x.name || '') || /prompt\s*engine/i.test(x.name || '')
          ));
          if (!candidates.length) { openStore(); return; }
          // Prefer enabled ones
          const enabled = candidates.filter(c => c.enabled);
          const ordered = enabled.length ? enabled : candidates;
          // Try each candidate until one opens
          (async () => {
            for (const ext of ordered) {
              await new Promise(r => setTimeout(r, 0));
              const result = await new Promise((resolve) => {
                const cb = (resp) => resolve(resp && resp.status === 'installed_opened');
                // Wrap tryTriggerForExt but intercept its sendResponse
                const original = sendResponse;
                let resolved = false;
                const localSend = (payload) => {
                  if (!resolved) {
                    resolved = true;
                    resolve(payload && payload.status === 'installed_opened');
                  }
                };
                // Temporarily call trigger with a local responder
                (async () => {
                  try {
                    // Inline copy of trigger logic with local send
                    if (!ext.enabled) { localSend({ status: 'installed_disabled' }); return; }
                    const tryOpen = (action) => new Promise((res) => {
                      try {
                        chrome.runtime.sendMessage(ext.id, { action }, (resp2) => {
                          if (chrome.runtime.lastError) { res(false); return; }
                          res(resp2 === undefined ? true : !!(resp2.ok ?? true));
                        });
                      } catch (_) { res(false); }
                    });
                    const actions = ['open', 'openSidePanel', 'toggle', 'focus', 'launch'];
                    let ok = false;
                    for (const a of actions) { ok = await tryOpen(a); if (ok) break; }
                    localSend({ status: ok ? 'installed_opened' : 'installed_but_cannot_open' });
                  } catch (_) {
                    localSend({ status: 'installed_but_cannot_open' });
                  }
                })();
              });
              if (result) {
                try { chrome.storage.local.set({ peExtId: ext.id }); } catch (_) {}
                sendResponse({ status: 'installed_opened' });
                return;
              }
            }
            sendResponse({ status: 'installed_but_cannot_open' });
          })();
        });
        return true; // async
      } catch (e) {
        openStore();
        return true;
      }
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
// Simple gate to redirect unauthenticated users to our login page
(function(){
  try {
    const onReady = () => {
      try {
        chrome.storage.local.get(['firebaseUser'], (d) => {
          if (!d || !d.firebaseUser) {
            const loginUrl = chrome.runtime.getURL('resources/login.html');
            if (location.origin.startsWith('https://chatgpt.com') || location.origin.startsWith('https://www.chatgpt.com') || location.origin.startsWith('https://gemini.google.com')) {
              window.location.href = loginUrl;
            }
          }
        });
      } catch (e) {}
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') onReady();
    else document.addEventListener('DOMContentLoaded', onReady);
  } catch (e) {}
})();


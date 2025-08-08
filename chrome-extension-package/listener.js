// Convert external messages into user-gesture by listening for a synthetic click from the launcher
// The launcher will inject a custom event on the page to simulate a user gesture boundary.
// Then we ask the service worker to open the side panel.

// 1) Preferred: react to the real user click on the Super Navigator's button
document.addEventListener('click', (ev) => {
  try {
    const el = ev.target && (ev.target.closest && ev.target.closest('#zeroeka-extension-button'));
    if (el) {
      // We are inside a trusted user gesture here (actual click)
      chrome.runtime.sendMessage({ type: 'open-from-content' });
    }
  } catch (_) {}
}, true);

// 2) Fallback: support synthetic event bridge if ever used
window.addEventListener('pe-zeroeka-open', () => {
  try { chrome.runtime.sendMessage({ type: 'open-from-content' }); } catch (_) {}
}, true);

// Also listen on document to ensure capture in all cases
document.addEventListener('pe-zeroeka-open', () => {
  try { chrome.runtime.sendMessage({ type: 'open-from-content' }); } catch (_) {}
}, true);


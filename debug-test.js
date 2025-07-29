// Debug script to check extension loading
console.log('Debug: Extension loading check...');
console.log('Debug: Current URL:', window.location.href);
console.log('Debug: Hostname:', window.location.hostname);

// Check if we're on a supported platform
const isChatGPT = window.location.hostname.includes('chatgpt.com');
const isGemini = window.location.hostname.includes('gemini.google.com');

console.log('Debug: isChatGPT:', isChatGPT);
console.log('Debug: isGemini:', isGemini);

// Check if content.js functions are available
setTimeout(() => {
  console.log('Debug: Checking content.js functions...');
  console.log('Debug: extractTreeDataFromChatGPT available:', typeof window.extractTreeDataFromChatGPT);
  console.log('Debug: extractTreeDataFromGemini available:', typeof window.extractTreeDataFromGemini);
  console.log('Debug: isGemini global available:', typeof window.isGemini);
  
  // Check for floating button
  const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
  console.log('Debug: Floating button found:', !!floatbar);
  
  if (floatbar) {
    console.log('Debug: Floating button style:', floatbar.style.display);
    console.log('Debug: Floating button classes:', floatbar.className);
  }
}, 2000); 
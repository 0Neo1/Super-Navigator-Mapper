// Platform detection fix - ensure isGemini is set before content.js runs
(function() {
  // Set platform detection early
  const isGemini = window.location.hostname.includes('gemini.google.com');
  const isChatGPT = window.location.hostname.includes('chatgpt.com');
  
  // Make these globally available
  window.isGemini = isGemini;
  window.isChatGPT = isChatGPT;
  window.platform = isGemini ? 'gemini' : 'chatgpt';
  
  console.log('Platform fix: isGemini =', isGemini);
  console.log('Platform fix: isChatGPT =', isChatGPT);
  console.log('Platform fix: platform =', window.platform);
})(); 
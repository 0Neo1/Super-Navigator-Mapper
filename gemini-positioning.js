// Multi-platform main content positioning
// This script ensures the chat conversation content contracts and centers
// when the expanded sidebar is open, and restores to full width when closed.
// Works for both Gemini and ChatGPT pages.

(function() {
  // Check if we're on Gemini or ChatGPT
  const isGemini = window.location.hostname.includes('gemini.google.com');
  const isChatGPT = window.location.hostname.includes('chatgpt.com');
  
  if (isGemini || isChatGPT) {
    // Wait for the page to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPositioning);
    } else {
      initPositioning();
    }
  }

  function initPositioning() {
    // Check if styles already exist
    const styleId = isGemini ? 'zeroeka-gemini-main-positioning' : 'zeroeka-chatgpt-main-positioning';
    if (document.getElementById(styleId)) {
      return;
    }

    // Create and inject the CSS
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Contract main content when expanded sidebar is open - HIGH PRIORITY */
      body.zeroeka-expanded-sidebar-open main,
      body.zeroeka-expanded-sidebar-open main[role="main"] {
        width: calc(100vw - 300px) !important;
        max-width: calc(100vw - 300px) !important;
        margin-right: 0 !important;
        padding-right: 20px !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
      }
      
      /* Override any hardcoded inline styles */
      body.zeroeka-expanded-sidebar-open main[style*="margin-right"],
      body.zeroeka-expanded-sidebar-open main[style*="width"] {
        margin-right: 0 !important;
        width: calc(100vw - 300px) !important;
      }
      
      /* Override body margin-right if set */
      body.zeroeka-expanded-sidebar-open[style*="margin-right"] {
        margin-right: 0 !important;
      }
      
      /* Adjust sidebar positioning to be adjacent, not overlay */
      body.zeroeka-expanded-sidebar-open .catalogeu-navigation-plugin-floatbar .panel {
        position: fixed !important;
        right: 0 !important;
        top: 0 !important;
        height: 100vh !important;
        width: 300px !important;
        z-index: 1000 !important;
      }
      
      /* Ensure conversation content fits within contracted space */
      body.zeroeka-expanded-sidebar-open main *,
      body.zeroeka-expanded-sidebar-open main[role="main"] * {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      
      /* Reset to full width when sidebar is closed */
      body:not(.zeroeka-expanded-sidebar-open) main,
      body:not(.zeroeka-expanded-sidebar-open) main[role="main"] {
        width: auto !important;
        max-width: none !important;
        padding-right: 0 !important;
        overflow-x: visible !important;
      }
      
      /* Force override any remaining hardcoded styles */
      body.zeroeka-expanded-sidebar-open main[style] {
        margin-right: 0 !important;
        width: calc(100vw - 300px) !important;
      }
    `;
    
    document.head.appendChild(style);
    const platform = isGemini ? 'Gemini' : 'ChatGPT';
    console.log(`[${platform}] Added high-priority side-by-side layout to prevent sidebar overlay on conversation content`);
    
    // Set up observer to watch for sidebar state changes
    setupSidebarObserver();
  }

  function setupSidebarObserver() {
    // Watch for changes to the floatbar element's class list
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updatePositioning();
        }
      });
    });

    // Start observing the floatbar element
    const checkForFloatbar = () => {
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      if (floatbar) {
        observer.observe(floatbar, { attributes: true, attributeFilter: ['class'] });
        updatePositioning(); // Initial check
        
        // Set up periodic check to ensure positioning is always correct
        setInterval(updatePositioning, 1000);
        
        // Also watch for style attribute changes on main element
        const mainElement = document.querySelector('main') || document.querySelector('[role="main"]');
        if (mainElement) {
          const mainObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                // Force override any hardcoded styles
                if (document.body.classList.contains('zeroeka-expanded-sidebar-open')) {
                  mainElement.style.setProperty('margin-right', '0', 'important');
                  mainElement.style.setProperty('width', 'calc(100vw - 300px)', 'important');
                }
              }
            });
          });
          mainObserver.observe(mainElement, { attributes: true, attributeFilter: ['style'] });
        }
      } else {
        // Floatbar not found yet, check again in a moment
        setTimeout(checkForFloatbar, 500);
      }
    };

    checkForFloatbar();
  }

  function updatePositioning() {
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const isExpandedOpen = floatbar && floatbar.classList.contains('show-panel');
    
    // Add or remove body class to trigger CSS
    if (isExpandedOpen) {
      document.body.classList.add('zeroeka-expanded-sidebar-open');
      
      // Force override any hardcoded styles immediately
      const mainElement = document.querySelector('main') || document.querySelector('[role="main"]');
      if (mainElement) {
        mainElement.style.setProperty('margin-right', '0', 'important');
        mainElement.style.setProperty('width', 'calc(100vw - 300px)', 'important');
      }
      
      // Override body margin if set
      if (document.body.style.marginRight) {
        document.body.style.setProperty('margin-right', '0', 'important');
      }
    } else {
      document.body.classList.remove('zeroeka-expanded-sidebar-open');
      
      // Reset main element styles
      const mainElement = document.querySelector('main') || document.querySelector('[role="main"]');
      if (mainElement) {
        mainElement.style.removeProperty('margin-right');
        mainElement.style.removeProperty('width');
      }
    }
  }
})();

// ChatGPT-specific main content positioning
// This script prevents sidebar overlay by constraining the entire page width

(function() {
  // Check if we're on ChatGPT
  if (window.location.hostname.includes('chatgpt.com')) {
    // Wait for the page to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initChatGPTPositioning);
    } else {
      initChatGPTPositioning();
    }
  }

  function initChatGPTPositioning() {
    // Check if styles already exist
    if (document.getElementById('zeroeka-chatgpt-main-positioning')) {
      return;
    }

    // Create and inject the CSS
    const style = document.createElement('style');
    style.id = 'zeroeka-chatgpt-main-positioning';
    style.textContent = `
      /* ChatGPT body-level width constraint approach */
      body.zeroeka-expanded-sidebar-open {
        width: calc(100vw - 320px) !important;
        max-width: calc(100vw - 320px) !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
        position: relative !important;
      }
      
      /* Ensure all content respects the body constraint */
      body.zeroeka-expanded-sidebar-open *:not(.catalogeu-navigation-plugin-floatbar):not(.catalogeu-navigation-plugin-floatbar *) {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      
      /* Specific targeting for ChatGPT main containers */
      body.zeroeka-expanded-sidebar-open main#main,
      body.zeroeka-expanded-sidebar-open main,
      body.zeroeka-expanded-sidebar-open [role="main"] {
        width: 100% !important;
        max-width: 100% !important;
        margin-right: 0 !important;
        padding-right: 20px !important;
        box-sizing: border-box !important;
      }
      
      /* Position sidebar adjacent to constrained content */
      body.zeroeka-expanded-sidebar-open .catalogeu-navigation-plugin-floatbar .panel {
        position: fixed !important;
        right: 0 !important;
        top: 0 !important;
        height: 100vh !important;
        width: 320px !important;
        z-index: 1000 !important;
      }
      
      /* Reset when sidebar is closed */
      body:not(.zeroeka-expanded-sidebar-open) {
        width: auto !important;
        max-width: none !important;
        margin-left: auto !important;
        margin-right: auto !important;
        overflow-x: visible !important;
        position: static !important;
      }
      
      body:not(.zeroeka-expanded-sidebar-open) main#main,
      body:not(.zeroeka-expanded-sidebar-open) main,
      body:not(.zeroeka-expanded-sidebar-open) [role="main"] {
        width: auto !important;
        max-width: none !important;
        padding-right: 0 !important;
      }
      
      /* Override existing extension styles that might interfere */
      .catalogeu-navigation-plugin-floatbar.show-panel body,
      .catalogeu-navigation-plugin-floatbar.show-panel main,
      .catalogeu-navigation-plugin-floatbar.show-panel [role="main"] {
        margin-right: 0 !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('[ChatGPT] Added body-level width constraint to eliminate sidebar overlay');
    
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
      console.log('[ChatGPT] Sidebar opened - applying width constraint');
    } else {
      document.body.classList.remove('zeroeka-expanded-sidebar-open');
      console.log('[ChatGPT] Sidebar closed - removing width constraint');
    }
  }
})();
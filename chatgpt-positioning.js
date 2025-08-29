// ChatGPT-specific main content positioning
// This script pushes the ChatGPT chat conversation area to prevent sidebar overlay

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
      /* Contract main content when expanded sidebar is open - ChatGPT specific */
      body.zeroeka-expanded-sidebar-open main,
      body.zeroeka-expanded-sidebar-open [role="main"],
      body.zeroeka-expanded-sidebar-open .flex.flex-1.overflow-hidden,
      body.zeroeka-expanded-sidebar-open .flex.h-full.flex-1.flex-col,
      body.zeroeka-expanded-sidebar-open .flex-1.overflow-hidden {
        width: calc(100vw - 75px - 20px) !important;
        max-width: calc(100vw - 75px - 20px) !important;
        margin-right: 0 !important;
        padding-right: 0 !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
      }
      
      /* Adjust sidebar positioning to be adjacent, not overlay */
      body.zeroeka-expanded-sidebar-open .catalogeu-navigation-plugin-floatbar .panel {
        position: fixed !important;
        right: 0 !important;
        top: 0 !important;
        height: 100vh !important;
        width: 75px !important;
        z-index: 1000 !important;
      }
      
      /* Ensure conversation content fits within contracted space */
      body.zeroeka-expanded-sidebar-open main *,
      body.zeroeka-expanded-sidebar-open [role="main"] *,
      body.zeroeka-expanded-sidebar-open .flex.flex-1.overflow-hidden *,
      body.zeroeka-expanded-sidebar-open .flex.h-full.flex-1.flex-col *,
      body.zeroeka-expanded-sidebar-open .flex-1.overflow-hidden * {
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      
      /* ChatGPT specific conversation containers */
      body.zeroeka-expanded-sidebar-open [data-testid="conversation-turn"],
      body.zeroeka-expanded-sidebar-open .conversation-content {
        max-width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        box-sizing: border-box !important;
      }
      
      /* Reset to full width when sidebar is closed */
      body:not(.zeroeka-expanded-sidebar-open) main,
      body:not(.zeroeka-expanded-sidebar-open) [role="main"],
      body:not(.zeroeka-expanded-sidebar-open) .flex.flex-1.overflow-hidden,
      body:not(.zeroeka-expanded-sidebar-open) .flex.h-full.flex-1.flex-col,
      body:not(.zeroeka-expanded-sidebar-open) .flex-1.overflow-hidden {
        width: auto !important;
        max-width: none !important;
        padding-right: 0 !important;
        overflow-x: visible !important;
      }
      
      /* Override the existing CSS that uses 600px margin */
      .catalogeu-navigation-plugin-floatbar.show-panel body,
      .catalogeu-navigation-plugin-floatbar.show-panel main,
      .catalogeu-navigation-plugin-floatbar.show-panel [role="main"],
      .catalogeu-navigation-plugin-floatbar.show-panel .flex.flex-1.overflow-hidden,
      .catalogeu-navigation-plugin-floatbar.show-panel .flex.h-full.flex-1.flex-col,
      .catalogeu-navigation-plugin-floatbar.show-panel .flex-1.overflow-hidden {
        margin-right: 0 !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('[ChatGPT] Added side-by-side layout with minimal gap between content and sidebar');
    
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
    } else {
      document.body.classList.remove('zeroeka-expanded-sidebar-open');
    }
  }
})();

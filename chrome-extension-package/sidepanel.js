// Super Mapper-Navigator Sidebar Script

(function() {
  'use strict';

  // Initialize translation system
  translate(document);

  // State management
  let currentTreeData = null;
  let isLoading = false;
  let isConnected = false;
  let partialMode = false;
  let wideMode = false;
  let currentTabId = null;

  // DOM elements
  const elements = {
    treeList: document.querySelector('.tree-list'),
    loadingOverlay: document.getElementById('sidebar-loading'),
    errorMessage: document.getElementById('sidebar-error'),
    closeBtn: document.querySelector('.close'),
    foldBtn: document.querySelector('.fold'),
    syncBtn: document.querySelector('.sync'),
    deepBtn: document.querySelector('.deep'),
    refreshBtn: document.querySelector('.refresh'),
    newBtn: document.querySelector('.new'),
    moreBtn: document.querySelector('.more'),
    userBtn: document.querySelector('.user'),
    exportBtn: document.querySelector('.export'),
    fullBtn: document.querySelector('.full'),
    areasBtn: document.querySelector('.areas'),
    wideBtn: document.querySelector('.wide'),
    mindBtn: document.querySelector('.mind'),
    partialBtn: document.querySelector('.partial'),
    retryBtn: document.querySelector('.retry-button'),
    resizeBar: document.querySelector('.resizebar')
  };

  // Utility functions
  function showLoading(message = 'Loading...') {
    if (elements.loadingOverlay) {
      const loadingText = elements.loadingOverlay.querySelector('.loading-text');
      if (loadingText) loadingText.textContent = message;
      elements.loadingOverlay.classList.add('show');
    }
    isLoading = true;
  }

  function hideLoading() {
    if (elements.loadingOverlay) {
      elements.loadingOverlay.classList.remove('show');
    }
    isLoading = false;
  }

  function showError(message = 'An error occurred') {
    if (elements.errorMessage) {
      const errorText = elements.errorMessage.querySelector('.error-text');
      if (errorText) errorText.textContent = message;
      elements.errorMessage.classList.add('show');
    }
  }

  function hideError() {
    if (elements.errorMessage) {
      elements.errorMessage.classList.remove('show');
    }
  }

  // Communication with content script
  function sendMessageToContentScript(message, callback) {
    if (!chrome.tabs) {
      console.warn('Chrome tabs API not available');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          if (chrome.runtime.lastError) {
            console.warn('Error sending message:', chrome.runtime.lastError.message);
            if (callback) callback(null, chrome.runtime.lastError);
          } else {
            if (callback) callback(response, null);
          }
        });
      } else {
        if (callback) callback(null, new Error('No active tab found'));
      }
    });
  }

  // Tree rendering functions
  function createTreeNode(nodeData, level = 0, parentCollapsed = false) {
    const li = document.createElement('li');
    li.className = 'tree-node';
    li.setAttribute('data-level', level);
    li.setAttribute('data-message-id', nodeData.id || '');

    const hasChildren = nodeData.children && nodeData.children.length > 0;
    
    if (!hasChildren) {
      li.classList.add('leaf');
    }

    // Create expand/collapse icon
    const icon = document.createElement('i');
    icon.className = 'tree-icon';
    if (hasChildren) {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNode(li);
      });
    }
    li.appendChild(icon);

    // Create content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'tree-content';
    contentDiv.innerHTML = `<span>${escapeHtml(nodeData.content || nodeData.text || 'Untitled')}</span>`;
    
    // Add click handler for navigation
    contentDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateToMessage(nodeData.id);
    });

    li.appendChild(contentDiv);

    // Create children container
    if (hasChildren) {
      const childrenUl = document.createElement('ul');
      childrenUl.className = 'tree-children';
      
      nodeData.children.forEach(childNode => {
        const childLi = createTreeNode(childNode, level + 1, parentCollapsed);
        childrenUl.appendChild(childLi);
      });
      
      li.appendChild(childrenUl);
    }

    return li;
  }

  function toggleNode(nodeElement) {
    const isCollapsed = nodeElement.classList.contains('collapsed');
    
    if (isCollapsed) {
      nodeElement.classList.remove('collapsed');
    } else {
      nodeElement.classList.add('collapsed');
    }

    // Animate the transition
    const childrenContainer = nodeElement.querySelector('.tree-children');
    if (childrenContainer) {
      if (isCollapsed) {
        childrenContainer.style.display = 'block';
      } else {
        childrenContainer.style.display = 'none';
      }
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderTree(treeData) {
    if (!elements.treeList) return;

    // Clear existing content
    elements.treeList.innerHTML = '';

    if (!treeData || !Array.isArray(treeData)) {
      elements.treeList.setAttribute('empty-notice', lang('noConversations') || 'No conversations found');
      return;
    }

    // Render each top-level node
    treeData.forEach(nodeData => {
      const treeNode = createTreeNode(nodeData, 0);
      elements.treeList.appendChild(treeNode);
    });
  }

  function navigateToMessage(messageId) {
    if (!messageId) return;

    sendMessageToContentScript({
      type: 'navigate-to-message',
      messageId: messageId
    }, (response, error) => {
      if (error) {
        console.warn('Failed to navigate to message:', error);
        showError(lang('navigationError') || 'Failed to navigate to message');
      }
    });
  }

  // Data loading functions
  function loadConversationTree(deep = false) {
    if (isLoading) return;

    showLoading(deep ? 'Deep syncing...' : 'Loading conversation tree...');
    hideError();

    sendMessageToContentScript({
      type: 'get-conversation-tree',
      deep: deep
    }, (response, error) => {
      hideLoading();
      
      if (error || !response) {
        console.error('Failed to load conversation tree:', error);
        showError(lang('loadError') || 'Failed to load conversation data');
        return;
      }

      if (response.success && response.data) {
        currentTreeData = response.data;
        renderTree(currentTreeData);
        updateConnectionStatus(true);
      } else {
        showError(response.error || 'Failed to load conversation data');
        updateConnectionStatus(false);
      }
    });
  }

  function refreshConversation() {
    sendMessageToContentScript({
      type: 'refresh-conversation'
    }, (response, error) => {
      if (!error && response && response.success) {
        // Reload the tree after refresh
        setTimeout(() => loadConversationTree(), 1000);
      }
    });
  }

  function updateConnectionStatus(connected) {
    isConnected = connected;
    
    // Update sync button states
    if (elements.syncBtn) {
      elements.syncBtn.classList.toggle('inactive', !connected);
    }
    if (elements.deepBtn) {
      elements.deepBtn.classList.toggle('inactive', !connected);
    }
  }

  // Button event handlers
  function setupEventListeners() {
    // Close button
    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', () => {
        sendMessageToContentScript({ type: 'close-sidebar' });
      });
    }

    // Fold button
    if (elements.foldBtn) {
      elements.foldBtn.addEventListener('click', () => {
        const isOpen = elements.foldBtn.classList.contains('open');
        elements.foldBtn.classList.toggle('open', !isOpen);
        
        // Toggle all tree nodes
        const treeNodes = elements.treeList.querySelectorAll('li:not(.leaf)');
        treeNodes.forEach(node => {
          if (!isOpen) {
            node.classList.remove('collapsed');
          } else {
            node.classList.add('collapsed');
          }
        });
      });
    }

    // Sync button
    if (elements.syncBtn) {
      elements.syncBtn.addEventListener('click', () => {
        elements.syncBtn.classList.toggle('inactive');
        loadConversationTree(false);
      });
    }

    // Deep sync button
    if (elements.deepBtn) {
      elements.deepBtn.addEventListener('click', () => {
        elements.deepBtn.classList.toggle('inactive');
        loadConversationTree(true);
      });
    }

    // Refresh button
    if (elements.refreshBtn) {
      elements.refreshBtn.addEventListener('click', () => {
        refreshConversation();
      });
    }

    // New button
    if (elements.newBtn) {
      elements.newBtn.addEventListener('click', () => {
        sendMessageToContentScript({
          type: 'new-chat'
        });
      });
    }

    // More menu handlers
    if (elements.moreBtn) {
      // User button
      if (elements.userBtn) {
        elements.userBtn.addEventListener('click', () => {
          chrome.runtime.sendMessage({ type: 'popup-page' });
        });
      }

      // Export button
      if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', () => {
          sendMessageToContentScript({
            type: 'export-conversation'
          });
        });
      }

      // Full button
      if (elements.fullBtn) {
        elements.fullBtn.addEventListener('click', () => {
          sendMessageToContentScript({
            type: 'toggle-fullscreen'
          });
        });
      }
    }

    // Areas button
    if (elements.areasBtn) {
      const headArea = elements.areasBtn.querySelector('div > div:first-child');
      const inputArea = elements.areasBtn.querySelector('div > div:last-child');
      
      if (headArea) {
        headArea.addEventListener('click', () => {
          sendMessageToContentScript({
            type: 'toggle-headbar'
          });
        });
      }
      
      if (inputArea) {
        inputArea.addEventListener('click', () => {
          sendMessageToContentScript({
            type: 'toggle-speakbox'
          });
        });
      }
    }

    // Wide mode button
    if (elements.wideBtn) {
      elements.wideBtn.addEventListener('click', () => {
        wideMode = !wideMode;
        elements.wideBtn.textContent = wideMode ? '] [' : '[　]';
        
        sendMessageToContentScript({
          type: 'toggle-wide-mode',
          enabled: wideMode
        });
      });
    }

    // Mind map button
    if (elements.mindBtn) {
      elements.mindBtn.addEventListener('click', () => {
        sendMessageToContentScript({
          type: 'generate-mindmap'
        });
      });
    }

    // Partial mode button
    if (elements.partialBtn) {
      elements.partialBtn.addEventListener('click', () => {
        partialMode = !partialMode;
        elements.partialBtn.classList.toggle('active', partialMode);
        
        sendMessageToContentScript({
          type: 'toggle-partial-mode',
          enabled: partialMode
        });
      });
    }

    // Retry button
    if (elements.retryBtn) {
      elements.retryBtn.addEventListener('click', () => {
        hideError();
        loadConversationTree();
      });
    }

    // Resize functionality
    if (elements.resizeBar) {
      let isResizing = false;
      let startX = 0;
      let startWidth = 0;

      elements.resizeBar.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = document.body.offsetWidth;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
      });

      function handleResize(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(250, Math.min(600, startWidth + deltaX));
        
        // Notify content script about resize
        sendMessageToContentScript({
          type: 'resize-sidebar',
          width: newWidth
        });
      }

      function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      }
    }
  }

  // Message listener for communication with content script
  function setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'update-tree-data':
          currentTreeData = message.data;
          renderTree(currentTreeData);
          sendResponse({ success: true });
          break;
          
        case 'tree-loading':
          if (message.loading) {
            showLoading(message.message || 'Loading...');
          } else {
            hideLoading();
          }
          sendResponse({ success: true });
          break;
          
        case 'tree-error':
          showError(message.message || 'An error occurred');
          sendResponse({ success: true });
          break;
          
        case 'connection-status':
          updateConnectionStatus(message.connected);
          sendResponse({ success: true });
          break;
          
        default:
          // Unknown message type
          break;
      }
    });
  }

  // Keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + R: Refresh
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        loadConversationTree();
      }
      
      // Ctrl/Cmd + Shift + R: Deep refresh
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        loadConversationTree(true);
      }
      
      // Escape: Close sidebar
      if (e.key === 'Escape') {
        sendMessageToContentScript({ type: 'close-sidebar' });
      }
      
      // F: Toggle fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        sendMessageToContentScript({ type: 'toggle-fullscreen' });
      }
      
      // P: Toggle partial mode
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        if (elements.partialBtn) {
          elements.partialBtn.click();
        }
      }
    });
  }

  // Theme detection and handling
  function setupThemeHandling() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme(e) {
      document.body.classList.toggle('dark-theme', e.matches);
    }
    
    updateTheme(prefersDark);
    prefersDark.addListener(updateTheme);
  }

  // Check if we're on a ChatGPT page
  function checkPageCompatibility() {
    sendMessageToContentScript({
      type: 'check-compatibility'
    }, (response, error) => {
      if (error || !response || !response.compatible) {
        showError(lang('incompatiblePage') || 'This page is not compatible with Super Mapper-Navigator');
        updateConnectionStatus(false);
      } else {
        updateConnectionStatus(true);
        // Auto-load tree data on compatible pages
        loadConversationTree();
      }
    });
  }

  // Auto-refresh functionality
  function setupAutoRefresh() {
    // Listen for page navigation changes
    let lastUrl = '';
    
    setInterval(() => {
      sendMessageToContentScript({
        type: 'get-current-url'
      }, (response) => {
        if (response && response.url && response.url !== lastUrl) {
          lastUrl = response.url;
          // URL changed, reload tree
          setTimeout(() => loadConversationTree(), 1000);
        }
      });
    }, 2000);
  }

  // Initialization
  function initialize() {
    console.log('Super Mapper-Navigator Sidebar initializing...');
    
    // Setup all functionality
    setupEventListeners();
    setupMessageListener();
    setupKeyboardShortcuts();
    setupThemeHandling();
    
    // Check page compatibility and load initial data
    setTimeout(() => {
      checkPageCompatibility();
      setupAutoRefresh();
    }, 500);
    
    console.log('Super Mapper-Navigator Sidebar initialized');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    sendMessageToContentScript({ type: 'sidebar-closing' });
  });

})(); 
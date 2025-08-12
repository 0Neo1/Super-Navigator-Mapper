// content.js

// --- Globals ---
let sidebar;
let promptCounter = 0;
const PROMPT_SELECTOR = 'user-query-content .query-text';

/**
 * Debounce function to limit the rate at which a function gets called.
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


/**
 * Creates and injects the main sidebar container into the page.
 * The sidebar is created only once.
 */
function createSidebar() {
    if (document.getElementById('gemini-chat-navigator-sidebar')) {
        return; // Sidebar already exists
    }

    sidebar = document.createElement('div');
    sidebar.id = 'gemini-chat-navigator-sidebar';

    const header = document.createElement('div');
    header.className = 'sidebar-header';
    header.innerHTML = `
        <h2>Chat Navigator</h2>
        <button id="toggle-sidebar-btn" title="Toggle Navigator">‹</button>
    `;
    sidebar.appendChild(header);

    const navList = document.createElement('ul');
    navList.id = 'gemini-nav-list';
    sidebar.appendChild(navList);

    document.body.appendChild(sidebar);

    // --- Event Listeners ---

    // Add hover-to-peek functionality
    sidebar.addEventListener('mouseenter', () => {
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('peek');
        }
    });

    sidebar.addEventListener('mouseleave', () => {
        if (sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('peek');
        }
    });

    // Event listener for the permanent toggle button
    const toggleButton = document.getElementById('toggle-sidebar-btn');
    toggleButton.addEventListener('click', () => {
        sidebar.classList.remove('peek'); 
        sidebar.classList.toggle('collapsed');
        
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggleButton.textContent = isCollapsed ? '›' : '‹';

        // Save the state to chrome.storage
        chrome.storage.local.set({ sidebarCollapsed: isCollapsed });
    });
}

/**
 * Finds all user prompts on the page, extracts text, and updates the navigation sidebar.
 * This function is designed to be idempotent and can be called multiple times.
 */
function updateNavigation() {
    const navList = document.getElementById('gemini-nav-list');
    if (!navList) {
        console.log("Gemini Navigator: Nav list not found. Bailing.");
        return;
    }

    const prompts = document.querySelectorAll(PROMPT_SELECTOR);

    // Clear existing links to rebuild them, ensuring order and no duplicates.
    navList.innerHTML = '';
    promptCounter = 0;

    prompts.forEach(promptEl => {
        promptCounter++; // Increment at the start for 1-based indexing

        // Find the closest parent that can serve as a reliable anchor
        const anchorEl = promptEl.closest('user-query') || promptEl;
        if (!anchorEl.id) {
            anchorEl.id = `gemini-prompt-${promptCounter}`;
        }

        // Extract the first line or first 50 characters as the title
        let linkText = promptEl.textContent.trim().split('\n')[0];
        if (linkText.length > 50) {
            linkText = linkText.substring(0, 50) + '...';
        }
        
        if (!linkText) return; // Skip empty prompts

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${anchorEl.id}`;
        link.title = promptEl.textContent.trim(); // Full prompt on hover

        // Create spans for number and text for better styling
        const numberSpan = document.createElement('span');
        numberSpan.className = 'prompt-number';
        numberSpan.textContent = `${promptCounter}.`;

        const textSpan = document.createElement('span');
        textSpan.className = 'prompt-text';
        textSpan.textContent = linkText;

        link.appendChild(numberSpan);
        link.appendChild(textSpan);

        // Add smooth scroll behavior
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.getElementById(anchorEl.id);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    // ** FIX ** Changed from 'center' to 'start' to align to the top
                    block: 'start'
                });
                // Add a temporary highlight to the scrolled-to element
                const highlightTarget = targetElement.querySelector('.user-query-container') || targetElement;
                highlightTarget.classList.add('highlight-prompt');
                setTimeout(() => {
                    highlightTarget.classList.remove('highlight-prompt');
                }, 1500);
            }
        });

        listItem.appendChild(link);
        navList.appendChild(listItem);
    });
}

// --- Main Execution ---

// Debounced version of our update function for performance
const debouncedUpdate = debounce(updateNavigation, 500);

// Function to initialize the extension
function initialize() {
    createSidebar();
    
    // Load the saved state from chrome.storage
    chrome.storage.local.get('sidebarCollapsed', (data) => {
        if (data.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            document.getElementById('toggle-sidebar-btn').textContent = '›';
        }
    });
    
    // Initial scan of the page
    debouncedUpdate();

    // Set up a MutationObserver to watch for changes in the chat log
    const observerTarget = document.body;
    if (!observerTarget) {
        console.error("Gemini Navigator: Could not find observer target.");
        return;
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                 const hasNewContent = Array.from(mutation.addedNodes).some(node => node.nodeType === 1 && node.querySelector(PROMPT_SELECTOR));
                 if (hasNewContent) {
                    debouncedUpdate();
                    return;
                 }
            }
        }
    });

    observer.observe(observerTarget, {
        childList: true,
        subtree: true
    });

    console.log("Gemini Chat Navigator is active.");
}

// Use a timer to check if the chat interface has loaded.
const initInterval = setInterval(() => {
    if (document.querySelector(PROMPT_SELECTOR)) {
        clearInterval(initInterval);
        initialize();
    }
}, 500);

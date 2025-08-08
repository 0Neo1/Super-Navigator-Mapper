document.addEventListener('DOMContentLoaded', async () => {
    console.log('Extension loaded, checking authentication...');
    
    // Show loading screen and set dark mode immediately
    const initialLoader = document.getElementById('initialLoader');
    const container = document.querySelector('.container');
    document.body.classList.add('dark-mode');
    
    // Add a small delay to ensure storage is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
    // Check authentication status first
    const isAuthenticated = await checkAuthStatus();
    console.log('Authentication status:', isAuthenticated);
    
    if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to login page');
            hideInitialLoader();
        window.location.href = 'login.html';
        return;
    }

    console.log('User authenticated, loading main interface');
    // Load user profile info and force sync with server
    await loadUserProfile();
    
    // Additional server sync to ensure data consistency
    try {
        console.log('Performing additional server sync...');
        const token = await getAuthToken();
        if (token) {
            const response = await fetch(`${window.API_BASE_URL}/api/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const responseData = await response.json();
                console.log('Additional sync - server response:', responseData);
                
                // Extract user data and update storage if valid
                let userData = null;
                if (responseData.user && responseData.user.firstName && responseData.user.email) {
                    userData = responseData.user;
                } else if (responseData.firstName && responseData.email) {
                    userData = responseData;
                }
                
                if (userData) {
                    if (!userData.lastName) userData.lastName = '';
                    await chrome.storage.local.set({ user: userData });
                    console.log('Additional sync - updated storage with server data:', userData);
                    
                    // Update display
                    await refreshProfileDisplay();
                }
            }
        }
    } catch (syncError) {
        console.log('Additional server sync failed (not critical):', syncError);
    }

        // Check prompt limit status
        await checkPromptLimitStatus();

        // Initialize all event listeners and UI components
        await initializeInterface();
        
        // Hide loading screen and show main content
        hideInitialLoader();
        
    } catch (error) {
        console.error('Error during initialization:', error);
        hideInitialLoader();
        // Show error message or redirect to login
        window.location.href = 'login.html';
    }
});

// Function to hide the initial loader and show main content
function hideInitialLoader() {
    const initialLoader = document.getElementById('initialLoader');
    const container = document.querySelector('.container');
    
    if (initialLoader) {
        initialLoader.classList.add('hide');
        // Remove the loader from DOM after animation
        setTimeout(() => {
            if (initialLoader.parentNode) {
                initialLoader.parentNode.removeChild(initialLoader);
            }
        }, 500);
    }
    
    if (container) {
        container.classList.add('loaded');
    }
}

// Function to initialize the interface
async function initializeInterface() {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const expandBtn = document.getElementById('expandBtn');
    const inputExpandBtn = document.getElementById('inputExpandBtn');
    const rawTaskInput = document.getElementById('rawTask');
    const outputDiv = document.getElementById('output');
    const errorPopup = document.getElementById('errorPopup');
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    
    // --- Selectors ---
    const taskSelectorBtn = document.getElementById('taskSelector');
    const taskDropdown = document.getElementById('taskDropdown');
    const promptSizeSelectorBtn = document.getElementById('promptSizeSelector');
    const promptSizeDropdown = document.getElementById('promptSizeDropdown');

    // --- Modal Elements ---
    const customSizeModal = document.getElementById('customSizeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const setCustomSizeBtn = document.getElementById('setCustomSizeBtn');
    const customSizeInput = document.getElementById('customSizeInput');

    // --- Main Event Listeners ---
    generateBtn.addEventListener('click', handleGenerate);
    copyBtn.addEventListener('click', handleCopy);
    regenerateBtn.addEventListener('click', handleRegenerate);
    refreshBtn.addEventListener('click', handleRefresh);
    expandBtn.addEventListener('click', handleExpand);
    inputExpandBtn.addEventListener('click', handleInputExpand);
    if (profileButton) {
        profileButton.addEventListener('click', handleProfileNavigation);
    }

    // --- Dropdown Handling ---
    const allDropdowns = [
        { btn: taskSelectorBtn, menu: taskDropdown },
        { btn: promptSizeSelectorBtn, menu: promptSizeDropdown }
    ];

    allDropdowns.forEach(d => {
        let hideTimeout = null;
        let isOverButton = false;
        let isOverDropdown = false;

        // Button click to toggle dropdown
        d.btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns first
            allDropdowns.forEach(other_d => {
                if (other_d !== d) {
                    other_d.menu.classList.remove('show');
                    other_d.btn.classList.remove('open');
                }
            });
            // Then toggle the current one
            d.menu.classList.toggle('show');
            d.btn.classList.toggle('open');
        });

        // Mouse enter/leave events for button
        d.btn.addEventListener('mouseenter', () => {
            isOverButton = true;
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        });

        d.btn.addEventListener('mouseleave', () => {
            isOverButton = false;
            // Quick hide if not over dropdown
            if (!isOverDropdown && d.menu.classList.contains('show')) {
                hideTimeout = setTimeout(() => {
                    if (!isOverButton && !isOverDropdown) {
                        d.menu.classList.remove('show');
                        d.btn.classList.remove('open');
                    }
                }, 150); // 150ms delay for smooth transition
            }
        });

        // Mouse enter/leave events for dropdown
        d.menu.addEventListener('mouseenter', () => {
            isOverDropdown = true;
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        });

        d.menu.addEventListener('mouseleave', () => {
            isOverDropdown = false;
            // Quick hide if not over button
            if (!isOverButton && d.menu.classList.contains('show')) {
                hideTimeout = setTimeout(() => {
                    if (!isOverButton && !isOverDropdown) {
                        d.menu.classList.remove('show');
                        d.btn.classList.remove('open');
                    }
                }, 100); // Faster hide when leaving dropdown
            }
        });
    });

    // --- Task & Prompt Size Item Selection ---
    document.querySelectorAll('.task-item[data-task]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTask(item.dataset.task);
        });
    });

    document.querySelectorAll('.task-item[data-size]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const size = item.dataset.size;
            if (size === 'custom') {
                customSizeModal.style.display = 'block';
                customSizeInput.focus();
            } else {
                selectPromptSize(size);
            }
            // Close its dropdown
            promptSizeDropdown.classList.remove('show');
            promptSizeSelectorBtn.classList.remove('open');
        });
    });

    // --- Global Click to Close Dropdowns ---
    document.addEventListener('click', () => {
        allDropdowns.forEach(d => {
            d.menu.classList.remove('show');
            d.btn.classList.remove('open');
        });
    });

    // --- Modal Handling ---
    closeModalBtn.addEventListener('click', () => customSizeModal.style.display = 'none');
    setCustomSizeBtn.addEventListener('click', handleSetCustomSize);
    customSizeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSetCustomSize();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target == customSizeModal) {
            customSizeModal.style.display = 'none';
        }
    });

    // --- Init ---
    expandBtn.disabled = !outputDiv.textContent || outputDiv.textContent === 'Your AI-optimized prompt will appear here...';

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const container = document.querySelector('.container');
            if (container.classList.contains('fullscreen-output')) handleExpand();
            if (customSizeModal.style.display === 'block') customSizeModal.style.display = 'none';
        }
        if (e.key === 'F11' || (e.ctrlKey && e.shiftKey && e.key === 'F')) {
            e.preventDefault();
            const currentOutput = outputDiv.textContent;
            if (currentOutput && currentOutput !== 'Your AI-optimized prompt will appear here...' && currentOutput !== 'Generating...') {
                handleExpand();
            }
        }
    });
}

// --- STATE ---
let selectedTask = 'general';
let selectedPromptSize = { type: 'default', value: null };
let promptLimitData = {
    promptsLeft: null,
    lastChecked: null,
    resetTime: null
};

// --- FUNCTIONS ---

// Update the prompt limit display
function updatePromptLimitDisplay(promptsLeft, resetTime = null, isAdmin = false) {
    const promptsLeftElement = document.getElementById('promptsLeft');
    const promptLimitIndicator = document.querySelector('.prompt-limit-indicator');
    
    if (!promptsLeftElement || !promptLimitIndicator) return;
    
    // Handle admin users with unlimited prompts
    if (isAdmin || promptsLeft >= 999) {
        promptsLeftElement.textContent = '∞';
        const promptTextElement = promptLimitIndicator.querySelector('.prompt-limit-text');
        if (promptTextElement) {
            promptTextElement.innerHTML = `<span id="promptsLeft">∞</span> Unlimited`;
        }
        promptLimitIndicator.setAttribute('data-tooltip', 'Admin account - unlimited prompts');
        promptLimitIndicator.classList.remove('warning', 'critical');
        promptLimitIndicator.classList.add('admin');
        return;
    }
    
    promptsLeftElement.textContent = promptsLeft;
    
    // Update the text to be singular or plural
    const promptTextElement = promptLimitIndicator.querySelector('.prompt-limit-text');
    if (promptTextElement) {
        const promptWord = promptsLeft === 1 ? 'Prompt Left' : 'Prompts Left';
        promptTextElement.innerHTML = `<span id="promptsLeft">${promptsLeft}</span> ${promptWord}`;
    }
    
    // Set tooltip with renewal time
    if (resetTime) {
        const resetDate = new Date(resetTime);
        const hours = resetDate.getHours().toString().padStart(2, '0');
        const minutes = resetDate.getMinutes().toString().padStart(2, '0');
        promptLimitIndicator.setAttribute('data-tooltip', `Renews at ${hours}:${minutes} hrs`);
    } else {
        // If no reset time (new user or just reset), calculate next hour
        const nextHour = new Date();
        nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
        const hours = nextHour.getHours().toString().padStart(2, '0');
        promptLimitIndicator.setAttribute('data-tooltip', `Renews at ${hours}:00 hrs`);
    }
    
    // Reset classes
    promptLimitIndicator.classList.remove('warning', 'critical', 'admin');
    
    // Add warning classes based on remaining prompts
    if (promptsLeft <= 3 && promptsLeft > 1) {
        promptLimitIndicator.classList.add('warning');
    } else if (promptsLeft <= 1) {
        promptLimitIndicator.classList.add('critical');
    }
}

// Check prompt limit status from the server
async function checkPromptLimitStatus() {
    try {
        const token = await getAuthToken();
        if (!token) {
            // If no token, show default but don't store it
            updatePromptLimitDisplay(10);
            return;
        }

        try {
            const response = await fetch(`${window.API_BASE_URL}/api/prompt-limit-status`, {
                headers: { 'Authorization': `Bearer ${token}` },
                // Add timeout to prevent hanging requests
                signal: AbortSignal.timeout(5000)
            });

            if (response.ok) {
                const data = await response.json();
                updatePromptLimitDisplay(data.promptsLeft, data.resetTime, data.isAdmin);
                promptLimitData = {
                    promptsLeft: data.promptsLeft,
                    lastChecked: new Date(),
                    resetTime: data.resetTime,
                    isAdmin: data.isAdmin
                };
                
                // Store in local storage for persistence
                await chrome.storage.local.set({ promptLimitData });
                console.log('Prompt limit updated from server:', data.promptsLeft, data.isAdmin ? '(Admin)' : '');
            } else {
                // Handle specific error codes
                if (response.status === 404) {
                    console.log('Prompt limit endpoint not found, using default values');
                } else {
                    console.log('Failed to fetch prompt limit status:', response.status);
                }
                
                // Use fallback values from storage or default
                useFallbackPromptLimit();
            }
        } catch (fetchError) {
            console.log('Network error checking prompt limit status:', fetchError.name);
            // Use fallback values from storage or default
            useFallbackPromptLimit();
        }
    } catch (error) {
        console.log('Error in checkPromptLimitStatus:', error.name);
        useFallbackPromptLimit();
    }
    
    // Helper function for fallback behavior
    async function useFallbackPromptLimit() {
        try {
            const stored = await chrome.storage.local.get('promptLimitData');
            if (stored.promptLimitData && stored.promptLimitData.promptsLeft !== null) {
                updatePromptLimitDisplay(stored.promptLimitData.promptsLeft, stored.promptLimitData.resetTime, stored.promptLimitData.isAdmin);
                promptLimitData = stored.promptLimitData;
                console.log('Using stored prompt limit:', stored.promptLimitData.promptsLeft, stored.promptLimitData.isAdmin ? '(Admin)' : '');
            } else {
                updatePromptLimitDisplay(10);
                console.log('Using default prompt limit: 10');
            }
        } catch (storageError) {
            console.log('Storage error, using default limit');
            updatePromptLimitDisplay(10);
        }
    }
}

function selectTask(taskType) {
    const taskIcon = document.querySelector('#taskSelector .task-icon');
    const taskName = document.querySelector('#taskSelector .task-name');
    const taskDropdown = document.getElementById('taskDropdown');
    const taskSelectorBtn = document.getElementById('taskSelector');
    
    document.querySelectorAll('.task-item[data-task]').forEach(item => item.classList.remove('active'));
    const selectedItem = document.querySelector(`.task-item[data-task="${taskType}"]`);
    
    if (selectedItem) {
        selectedItem.classList.add('active');
        taskIcon.textContent = selectedItem.querySelector('.task-item-icon').textContent;
        taskName.textContent = selectedItem.querySelector('.task-item-text').textContent;
    }
    
    selectedTask = taskType;
    
    // Explicitly close the dropdown
    taskDropdown.classList.remove('show');
    taskSelectorBtn.classList.remove('open');
}

function selectPromptSize(sizeType, sizeValue = null) {
    const promptSizeIcon = document.querySelector('#promptSizeSelector .task-icon');
    const promptSizeName = document.querySelector('#promptSizeSelector .task-name');

    document.querySelectorAll('.task-item[data-size]').forEach(item => item.classList.remove('active'));
    
    const selectedItem = document.querySelector(`.task-item[data-size="${sizeType}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        promptSizeIcon.textContent = selectedItem.querySelector('.task-item-icon').textContent;
    }

    if (sizeType === 'custom' && sizeValue) {
        promptSizeName.textContent = `${sizeValue} words`;
    } else {
        promptSizeName.textContent = 'Default';
    }

    selectedPromptSize = { type: sizeType, value: sizeValue ? parseInt(sizeValue) : null };
}

function handleSetCustomSize() {
    const customSizeInput = document.getElementById('customSizeInput');
    const sizeValue = customSizeInput.value;
    if (sizeValue && parseInt(sizeValue) >= 10) {
        selectPromptSize('custom', sizeValue);
        document.getElementById('customSizeModal').style.display = 'none';
    } else {
        showError('Please enter a number of at least 10.');
        customSizeInput.focus();
    }
}

async function handleGenerate() {
    const generateBtn = document.getElementById('generateBtn');
    const expandBtn = document.getElementById('expandBtn');
    const outputDiv = document.getElementById('output');
    const rawTaskInput = document.getElementById('rawTask');
    
    const rawTask = rawTaskInput ? rawTaskInput.value.trim() : '';
    if (!rawTask) {
        showError('Please enter a task description.');
        return;
    }

    // Show loading state
    generateBtn.disabled = true;
    generateBtn.querySelector('.btn-text').textContent = 'Generating...';
    outputDiv.textContent = 'Generating...';
    showLoadingProgress();

    try {
        const result = await callBackendApi(rawTask, selectedTask, selectedPromptSize.value);
        
        if (result.error) {
            // Handle rate limit error specifically
            if (result.error === 'Rate limit exceeded') {
                showError(`${result.message}`);
                
                // Update prompt limit display with reset time
                updatePromptLimitDisplay(0, result.resetTime);
                
                // Add countdown timer if minutes are provided
                if (result.minutesUntilReset) {
                    const resetTime = new Date(result.resetTime);
                    const countdownElement = document.createElement('div');
                    countdownElement.className = 'rate-limit-countdown';
                    countdownElement.innerHTML = `<span>Try again in: <strong id="countdown-timer">${result.minutesUntilReset}:00</strong></span>`;
                    
                    // Append countdown to error popup
                    const errorPopup = document.getElementById('errorPopup');
                    const errorText = errorPopup.querySelector('.error-text');
                    errorText.appendChild(countdownElement);
                    
                    // Start countdown
                    let secondsLeft = result.minutesUntilReset * 60;
                    const countdownTimer = document.getElementById('countdown-timer');
                    
                    const countdownInterval = setInterval(() => {
                        secondsLeft--;
                        const minutes = Math.floor(secondsLeft / 60);
                        const seconds = secondsLeft % 60;
                        countdownTimer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                        
                        if (secondsLeft <= 0) {
                            clearInterval(countdownInterval);
                            errorPopup.style.display = 'none';
                            // Refresh prompt limit status after countdown
                            checkPromptLimitStatus();
                        }
                    }, 1000);
                }
            } else {
                showError(result.error || 'Failed to generate prompt. Please try again.');
            }
            outputDiv.textContent = 'Your AI-optimized prompt will appear here...';
        } else {
            // Check if we have a valid prompt
            if (result.optimizedPrompt && typeof result.optimizedPrompt === 'string' && result.optimizedPrompt.trim().length > 0) {
                outputDiv.textContent = result.optimizedPrompt;
        expandBtn.disabled = false;

                // Add success animation
                outputDiv.classList.add('success');
                setTimeout(() => {
                    outputDiv.classList.remove('success');
                }, 500);
                
                // Immediately update prompt limit display with the response data
                if (result.promptsLeft !== undefined) {
                    updatePromptLimitDisplay(result.promptsLeft, result.resetTime || null, result.isAdmin || false);
                    // Store the updated data
                    promptLimitData = {
                        promptsLeft: result.promptsLeft,
                        lastChecked: new Date(),
                        resetTime: result.resetTime || null,
                        isAdmin: result.isAdmin || false
                    };
                    await chrome.storage.local.set({ promptLimitData });
                    console.log('Prompt limit updated immediately:', result.promptsLeft, result.isAdmin ? '(Admin)' : '');
                }
            } else {
                showError('Received empty response from server. Please try again.');
                outputDiv.textContent = 'Your AI-optimized prompt will appear here...';
            }
        }
    } catch (error) {
        console.log('Error generating prompt:', error.name, error.message);
        showError(error.message || 'Failed to connect to the server. Please check your internet connection and try again.');
        outputDiv.textContent = 'Your AI-optimized prompt will appear here...';
    } finally {
        generateBtn.disabled = false;
        generateBtn.querySelector('.btn-text').textContent = 'Generate Super Prompt';
        hideLoadingProgress();
    }
}

async function callBackendApi(rawTask, taskType, promptSize) {
    try {
    const token = await getAuthToken();
    if (!token) {
        throw new Error('Authentication required. Please log in again.');
    }

        // Get device info for analytics
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height
        };

        // Generate a session ID if not already present
        let sessionId = await chrome.storage.local.get('sessionId');
        if (!sessionId.sessionId) {
            sessionId = { sessionId: generateUUID() };
            await chrome.storage.local.set(sessionId);
        }

        try {
            // Add timeout to prevent hanging requests (increased for Gemini API)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000);

            const response = await fetch(`${window.API_BASE_URL}/api/generate-prompt`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
                body: JSON.stringify({
                    rawTask,
                    taskType,
                    promptSize,
                    sessionId: sessionId.sessionId,
                    deviceInfo
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            const serverData = await response.json();
            
            if (!response.ok) {
                // Handle rate limit or other errors
                return {
                    error: serverData.error || 'Server error',
                    message: serverData.message || 'An error occurred',
                    resetTime: serverData.resetTime,
                    minutesUntilReset: serverData.minutesUntilReset
                };
            }
            
            // Store in local history
            chrome.storage.local.get({promptHistory: []}, (storageResult) => {
                const history = storageResult.promptHistory;
                history.push({ 
                    id: generateUUID(),
                    input: rawTask, 
                    output: serverData.optimizedPrompt, 
                    task: taskType, 
                    timestamp: new Date().toISOString() 
                });
                chrome.storage.local.set({promptHistory: history});
            });

            return serverData;
        } catch (fetchError) {
            console.log('Network error in API call:', fetchError.name);
            if (fetchError.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
        }
            throw new Error('Network error. Please check your connection and try again.');
        }
    } catch (error) {
        console.log('API call error:', error.name, error.message);
        throw error;
    }
}

// Helper function to generate UUID for session tracking
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleCopy() {
    const outputDiv = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
    const copyNotification = document.getElementById('copyNotification');
    const textToCopy = outputDiv.textContent;

    if (textToCopy && textToCopy !== 'Your AI-optimized prompt will appear here...') {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show notification
            copyNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                copyNotification.classList.remove('show');
                copyNotification.classList.add('hide');
                
                // Remove hide class after animation completes
                setTimeout(() => {
                    copyNotification.classList.remove('hide');
                }, 300);
            }, 3000);

            // Brief button feedback
            const btnIcon = copyBtn.querySelector('.btn-icon');
            if (btnIcon) {
                const originalIcon = btnIcon.textContent;
                btnIcon.textContent = '✅';
                setTimeout(() => {
                    btnIcon.textContent = originalIcon;
                }, 1000);
            }
        });
    }
}

function handleRefresh() {
    // Refresh the extension page
    window.location.reload();
}

async function handleRegenerate() {
    const regenerateBtn = document.getElementById('regenerateBtn');
    const expandBtn = document.getElementById('expandBtn');
    const outputDiv = document.getElementById('output');
    
    const rawTaskElement = document.getElementById('rawTask');
    const rawTask = rawTaskElement ? rawTaskElement.value.trim() : '';
    
    // Check if there's input to regenerate with
    if (!rawTask) {
        showError('Please enter a task description first.');
        return;
    }

    // Check if there's already some output to regenerate
    const currentOutput = outputDiv.textContent;
    if (!currentOutput || currentOutput === 'Your AI-optimized prompt will appear here...') {
        showError('Generate a prompt first before regenerating.');
        return;
    }

    clearError();
    regenerateBtn.disabled = true;
    expandBtn.disabled = true;
    
    // Add loading state with spinning icon
    const regenerateBtnIcon = regenerateBtn.querySelector('.btn-icon');
    const originalIcon = regenerateBtnIcon ? regenerateBtnIcon.textContent : '';
    if (regenerateBtnIcon) {
        regenerateBtnIcon.textContent = '⚙️';
    }
    regenerateBtn.classList.add('loading');
    
    outputDiv.textContent = 'Regenerating...';
    
    // Show loading progress
    showLoadingProgress();

    try {
        const result = await callBackendApi(rawTask, selectedTask, selectedPromptSize.value);
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        // Check if we have a valid prompt
        if (result.optimizedPrompt && typeof result.optimizedPrompt === 'string' && result.optimizedPrompt.trim().length > 0) {
            outputDiv.textContent = result.optimizedPrompt;
            expandBtn.disabled = false;
        
        // Add success animation
        outputDiv.classList.add('success');
        setTimeout(() => {
            outputDiv.classList.remove('success');
        }, 500);

        // Save to history
            chrome.storage.local.get({promptHistory: []}, (storageResult) => {
                const history = storageResult.promptHistory;
                history.push({ 
                    id: generateUUID(), 
                    input: rawTask, 
                    output: result.optimizedPrompt, 
                    task: selectedTask, 
                    timestamp: new Date().toISOString() 
                });
            chrome.storage.local.set({promptHistory: history});
        });

            // Immediately update prompt limit display with the response data
            if (result.promptsLeft !== undefined) {
                updatePromptLimitDisplay(result.promptsLeft, result.resetTime || null, result.isAdmin || false);
                // Store the updated data
                promptLimitData = {
                    promptsLeft: result.promptsLeft,
                    lastChecked: new Date(),
                    resetTime: result.resetTime || null,
                    isAdmin: result.isAdmin || false
                };
                await chrome.storage.local.set({ promptLimitData });
                console.log('Prompt limit updated immediately after regeneration:', result.promptsLeft, result.isAdmin ? '(Admin)' : '');
            }
        } else {
            showError('Received empty response from server. Using previous result.');
            outputDiv.textContent = currentOutput;
        }
    } catch (error) {
        console.log('Error regenerating prompt:', error.name, error.message);
        showError(error.message || 'Failed to regenerate prompt. Please try again.');
        outputDiv.textContent = currentOutput; // Restore previous output on error
        expandBtn.disabled = currentOutput === 'Your AI-optimized prompt will appear here...'; // Only enable if there's valid content
    } finally {
        regenerateBtn.disabled = false;
        if (regenerateBtnIcon) {
            regenerateBtnIcon.textContent = originalIcon;
        }
        regenerateBtn.classList.remove('loading');
        hideLoadingProgress();
    }
}

function showError(message) {
    const errorPopup = document.getElementById('errorPopup');
    const errorText = errorPopup.querySelector('.error-text');
    errorText.textContent = message;
    errorPopup.classList.add('show');
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
        errorPopup.classList.remove('show');
    }, 2000);
}

function clearError() {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.classList.remove('show');
}

function handleExpand() {
    const container = document.querySelector('.container');
    const expandBtn = document.getElementById('expandBtn');
    const expandIcon = expandBtn.querySelector('.btn-icon');
    const expandText = expandBtn.querySelector('.btn-text');
    const outputDiv = document.getElementById('output');
    
    // Check if there's content to expand
    const currentOutput = outputDiv.textContent;
    if (!currentOutput || currentOutput === 'Your AI-optimized prompt will appear here...' || currentOutput === 'Generating...') {
        showError('Generate a prompt first before expanding.');
        return;
    }
    
    clearError();
    
    // Toggle fullscreen mode
    const isExpanded = container.classList.contains('fullscreen-output');
    
    if (isExpanded) {
        // Exit fullscreen
        container.classList.remove('fullscreen-output');
        expandBtn.classList.remove('expanded');
        if (expandIcon) expandIcon.textContent = '⛶';
        if (expandText) expandText.textContent = 'Expand';
        expandBtn.setAttribute('title', 'Expand to fullscreen');
        
        // Scroll back to output section
        const outputGroup = document.querySelector('.output-group');
        if (outputGroup) {
            outputGroup.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Enter fullscreen
        container.classList.add('fullscreen-output');
        expandBtn.classList.add('expanded');
        if (expandIcon) expandIcon.textContent = '✕';
        if (expandText) expandText.textContent = 'Exit';
        expandBtn.setAttribute('title', 'Exit fullscreen');
        
        // Focus the output area for better accessibility
        if (outputDiv) outputDiv.focus();
        
        // Scroll to top of the output
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Loading progress functions
let progressInterval;

function showLoadingProgress() {
    const loadingProgress = document.getElementById('loadingProgress');
    const progressRing = document.querySelector('.progress-ring-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressLabel = document.querySelector('.progress-label');
    const progressRing2 = document.querySelector('.progress-ring');
    
    // Show the progress circle
    if (loadingProgress) loadingProgress.classList.add('show');
    if (progressRing2) progressRing2.classList.add('pulse');
    
    let progress = 0;
    let phase = 'initializing';
    const circumference = 2 * Math.PI * 32; // 2 * π * radius
    
    // Define progress phases with different messages and speeds
    const phases = {
        initializing: { endProgress: 25, message: 'Initializing...', speed: 2 },
        analyzing: { endProgress: 55, message: 'Analyzing Task...', speed: 1.5 },
        generating: { endProgress: 85, message: 'Generating Prompt...', speed: 1 },
        optimizing: { endProgress: 95, message: 'Optimizing Output...', speed: 0.8 },
        finalizing: { endProgress: 98, message: 'Finalizing...', speed: 0.5 }
    };
    
    // Update progress label initially
    if (progressLabel) {
        progressLabel.textContent = phases[phase].message;
    }
    
    // Animate progress with realistic phases
    progressInterval = setInterval(() => {
        const currentPhase = phases[phase];
        const increment = Math.random() * currentPhase.speed + 0.5;
        progress += increment;
        
        // Check if we need to move to next phase
        if (progress >= currentPhase.endProgress) {
            progress = currentPhase.endProgress;
            
            // Move to next phase
            const phaseNames = Object.keys(phases);
            const currentIndex = phaseNames.indexOf(phase);
            if (currentIndex < phaseNames.length - 1) {
                phase = phaseNames[currentIndex + 1];
                if (progressLabel) {
                    progressLabel.textContent = phases[phase].message;
                }
            }
        }
        
        // Cap at 98% until completion
        if (progress > 98) {
            progress = 98;
        }
        
        // Update the circle with smoother animation
        if (progressRing) {
            const offset = circumference - (progress / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
        }
        
        // Update the percentage text with animation
        if (progressPercentage) {
            const displayProgress = Math.round(progress);
            progressPercentage.textContent = displayProgress + '%';
            
            // Add pulsing effect at milestones
            if (displayProgress % 25 === 0 && displayProgress > 0) {
                progressPercentage.style.transform = 'translate(-50%, -50%) scale(1.2)';
                setTimeout(() => {
                    progressPercentage.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 200);
            }
        }
        
        // Stop at 98% and wait for completion
        if (progress >= 98) {
            clearInterval(progressInterval);
        }
    }, 120); // Slightly slower for more realistic feel
}

function hideLoadingProgress() {
    const loadingProgress = document.getElementById('loadingProgress');
    const progressRing = document.querySelector('.progress-ring-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressLabel = document.querySelector('.progress-label');
    const progressRing2 = document.querySelector('.progress-ring');
    
    // Clear any running interval
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    // Animate to completion
    const circumference = 2 * Math.PI * 32;
    let currentProgress = 98;
    
    // Show completion phase
    if (progressLabel) {
        progressLabel.textContent = 'Complete!';
    }
    
    // Animate final 2% quickly with celebration effect
    const completionInterval = setInterval(() => {
        currentProgress += 1;
        
        if (currentProgress >= 100) {
            currentProgress = 100;
        }
        
        // Update circle
    if (progressRing) {
            const offset = circumference - (currentProgress / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;
    }
        
        // Update percentage with celebration effect
    if (progressPercentage) {
            progressPercentage.textContent = currentProgress + '%';
            
            // Celebration animation at 100%
            if (currentProgress === 100) {
                progressPercentage.style.transform = 'translate(-50%, -50%) scale(1.3)';
                progressPercentage.style.color = '#3b82f6';
                
                // Add success glow to the ring
                if (progressRing) {
                    progressRing.style.filter = 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))';
                }
                
                setTimeout(() => {
                    progressPercentage.style.transform = 'translate(-50%, -50%) scale(1)';
                    progressPercentage.style.color = '';
                    if (progressRing) {
                        progressRing.style.filter = '';
                    }
                }, 300);
            }
        }
        
        if (currentProgress >= 100) {
            clearInterval(completionInterval);
            
            // Hide after showing 100% briefly
    setTimeout(() => {
        if (loadingProgress) loadingProgress.classList.remove('show');
        if (progressRing2) progressRing2.classList.remove('pulse');
        
                // Reset for next use after fade out
        setTimeout(() => {
            if (progressRing) progressRing.style.strokeDashoffset = circumference;
                    if (progressPercentage) {
                        progressPercentage.textContent = '0%';
                        progressPercentage.style.transform = 'translate(-50%, -50%) scale(1)';
                        progressPercentage.style.color = '';
                    }
                    if (progressLabel) {
                        progressLabel.textContent = 'Initializing...';
                    }
                    if (progressRing) {
                        progressRing.style.filter = '';
                    }
                }, 400);
            }, 800); // Show completion for 800ms
        }
    }, 50); // Fast completion animation
}

function handleInputExpand() {
    const container = document.querySelector('.container');
    const inputExpandBtn = document.getElementById('inputExpandBtn');
    const inputExpandIcon = inputExpandBtn.querySelector('.btn-icon');
    const rawTaskInput = document.getElementById('rawTask');
    
    // Toggle fullscreen mode for input
    const isInputExpanded = container.classList.contains('fullscreen-input');
    
    if (isInputExpanded) {
        // Exit input fullscreen
        container.classList.remove('fullscreen-input');
        inputExpandBtn.classList.remove('expanded');
        if (inputExpandIcon) inputExpandIcon.textContent = '⛶';
        inputExpandBtn.setAttribute('title', 'Expand input area');
        
        // Scroll back to input section
        const inputSection = document.querySelector('.input-section');
        if (inputSection) {
            inputSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Enter input fullscreen
        container.classList.add('fullscreen-input');
        inputExpandBtn.classList.add('expanded');
        if (inputExpandIcon) inputExpandIcon.textContent = '✕';
        inputExpandBtn.setAttribute('title', 'Exit input fullscreen');
        
        // Focus the input area for better accessibility
        if (rawTaskInput) rawTaskInput.focus();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function handleProfileNavigation(e) {
    e.preventDefault();
    console.log('Profile button clicked');
    
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown) {
        // Toggle the dropdown visibility
        if (profileDropdown.classList.contains('show')) {
            profileDropdown.classList.remove('show');
        } else {
            profileDropdown.classList.add('show');
        }
    }
}

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileDropdown && profileButton) {
        if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
            // Hide dropdown when clicking outside
            profileDropdown.classList.remove('show');
        }
    }
});

// Handle profile menu items
document.addEventListener('DOMContentLoaded', () => {
    const settingsMenuItem = document.getElementById('settingsMenuItem');
    const logoutMenuItem = document.getElementById('logoutMenuItem');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    
    // Add mouse event listeners to handle dropdown visibility based on cursor position
    const profileDropdown = document.getElementById('profileDropdown');
    const profileButton = document.getElementById('profileButton');
    
    if (profileDropdown && profileButton) {
        // Track if the mouse is over the profile button or dropdown
        let isOverDropdown = false;
        let isOverButton = false;
        
        // Mouse enter/leave events for the dropdown
        profileDropdown.addEventListener('mouseenter', () => {
            isOverDropdown = true;
        });
        
        profileDropdown.addEventListener('mouseleave', () => {
            isOverDropdown = false;
            // Hide the dropdown if not over the button either
            if (!isOverButton) {
                profileDropdown.classList.remove('show');
            }
        });
        
        // Mouse enter/leave events for the profile button
        profileButton.addEventListener('mouseenter', () => {
            isOverButton = true;
        });
        
        profileButton.addEventListener('mouseleave', () => {
            isOverButton = false;
            // Small delay to allow mouse to enter dropdown if moving from button to dropdown
            setTimeout(() => {
                if (!isOverDropdown) {
                    profileDropdown.classList.remove('show');
                }
            }, 100);
        });
    }

    if (settingsMenuItem) {
        settingsMenuItem.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
            // Fetch and populate user data
            const token = await getAuthToken();
                if (!token) {
                    showError('Authentication token not found. Please login again.');
                    return;
                }

                console.log('Fetching profile data from server...');
                const response = await fetch(`${window.API_BASE_URL}/api/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                    const responseData = await response.json();
                    console.log('Settings modal - Profile response data:', responseData);
                    
                    let user = responseData.user;
                    
                    // Try to extract user data from different possible response formats
                    let userData = null;
                    
                    if (user && user.firstName && user.email) {
                        // Standard user object format
                        userData = user;
                        console.log('Settings modal - Using standard user object format');
                    } else if (responseData.firstName && responseData.email) {
                        // Direct response format (EC2 server might return data directly)
                        userData = responseData;
                        console.log('Settings modal - Using direct response format');
                    } else if (responseData.data && responseData.data.firstName && responseData.data.email) {
                        // Nested data format
                        userData = responseData.data;
                        console.log('Settings modal - Using nested data format');
                    } else {
                        console.log('Settings modal - Server returned invalid user data, using local storage fallback');
                        
                        // Check if EC2 server returned JWT data
                        if (user && user.iat && user.exp && !user.firstName) {
                            console.log('Settings modal - DETECTED: EC2 server returned JWT data instead of user profile data');
                            console.log('Settings modal - This indicates the EC2 server needs to be updated');
                        }
                        
                        // Fallback to local storage data
                        const localResult = await chrome.storage.local.get(['user']);
                        if (localResult.user) {
                            console.log('Settings modal - Using local storage user data:', localResult.user);
                            userData = localResult.user;
                        } else {
                            // If no local data, use empty defaults
                            console.log('Settings modal - No local storage data, using empty defaults');
                            userData = { firstName: '', lastName: '', email: '' };
                        }
                    }
                    
                    // Ensure lastName exists (even if empty)
                    if (!userData.lastName) {
                        userData.lastName = '';
                        console.log('Settings modal - lastName was missing, set to empty string');
                    }
                    
                    // Populate the form fields
                    document.getElementById('updateFirstName').value = userData.firstName || '';
                    document.getElementById('updateLastName').value = userData.lastName || '';
                    document.getElementById('updateEmail').value = userData.email || '';
                    
                    console.log('Settings modal - Profile form populated with data:', {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email
                    });

            settingsModal.style.display = 'block';
                } else if (response.status === 401 || response.status === 403) {
                    // Handle authentication errors
                    console.log('Authentication error, redirecting to login');
                    await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
                    window.location.href = 'login.html';
                } else {
                    console.error('Failed to load profile data, status:', response.status);
                    showError('Failed to load profile data. Please try again.');
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
                
                // Fallback to local storage if network fails
                try {
                    console.log('Network error, trying local storage fallback...');
                    const localResult = await chrome.storage.local.get(['user']);
                    if (localResult.user) {
                        console.log('Using local storage user data as fallback:', localResult.user);
                        const user = localResult.user;
                        document.getElementById('updateFirstName').value = user.firstName || '';
                        document.getElementById('updateLastName').value = user.lastName || '';
                        document.getElementById('updateEmail').value = user.email || '';
                        settingsModal.style.display = 'block';
                    } else {
                        showError('Network error and no cached profile data available.');
                    }
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                    showError('Network error. Please check your connection and try again.');
                }
            }
        });
    }

    if (closeSettingsModalBtn) {
        closeSettingsModalBtn.addEventListener('click', () => {
            settingsModal.style.display = 'none';
        });
    }

    // Close modal if clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    if (logoutMenuItem) {
        logoutMenuItem.addEventListener('click', async (e) => {
            e.preventDefault();
            // Clear all authentication data consistently
            await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    const updateProfileForm = document.getElementById('updateProfileForm');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = updateProfileForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span>Updating...</span>';
            submitButton.disabled = true;

            try {
            const token = await getAuthToken();
                if (!token) {
                    console.error('No authentication token found');
                    showError('Authentication token not found. Please login again.');
                    return;
                }

                const firstName = document.getElementById('updateFirstName').value.trim();
                const lastName = document.getElementById('updateLastName').value.trim();
                const newEmail = document.getElementById('updateEmail').value.trim();

                console.log('Form data collected:', { 
                    firstName: `"${firstName}"`, 
                    lastName: `"${lastName}"`, 
                    newEmail: `"${newEmail}"`,
                    firstNameLength: firstName.length,
                    lastNameLength: lastName.length
                });

                if (!firstName || !lastName) {
                    console.error('Validation failed: Missing required fields');
                    console.error('Validation details:', {
                        firstNameEmpty: !firstName,
                        lastNameEmpty: !lastName
                    });
                    showError('First name and last name are required');
                    return;
                }

                // Additional validation
                if (firstName.length < 1 || lastName.length < 1) {
                    console.error('Validation failed: Name fields too short');
                    showError('First name and last name must be at least 1 character long');
                    return;
                }

                // Get current user email to check if email changed
                const result = await chrome.storage.local.get(['user']);
                const currentEmail = result.user?.email;
                const emailChanged = newEmail && newEmail !== currentEmail && newEmail.includes('@');

                if (emailChanged) {
                    // Handle email update with OTP
                    await handleEmailUpdate(newEmail, token, firstName, lastName);
                } else {
                    // Handle regular profile update (name only)
                    await handleNameUpdate(firstName, lastName, token);
                }

            } catch (error) {
                console.error('Network error during profile update:', error);
                showError('Network error. Please check your connection and try again.');
            } finally {
                submitButton.innerHTML = '<span>Update Profile</span><div class="btn-glow"></div>';
                submitButton.disabled = false;
                console.log('Form submission process completed');
            }
        });
    }

    const updatePasswordForm = document.getElementById('updatePasswordForm');
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            console.log('Password update form submitted');
            const submitButton = updatePasswordForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span>Updating...</span>';
            submitButton.disabled = true;
            
            try {
            const token = await getAuthToken();
                if (!token) {
                    console.error('No authentication token found');
                    showError('Authentication token not found. Please login again.');
                    return;
                }

                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;

                console.log('Password form data collected');

                if (!currentPassword || !newPassword) {
                    console.error('Password validation failed: Missing required fields');
                    showError('Both current and new password are required');
                    return;
                }

                if (newPassword.length < 6) {
                    console.error('Password validation failed: Too short');
                    showError('New password must be at least 6 characters long');
                    return;
                }

                console.log('Making API request to update password...');
                const response = await fetch(`${window.API_BASE_URL}/api/auth/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                        currentPassword,
                        newPassword
                })
            });

                console.log('Password update response received:', response.status, response.statusText);

            if (response.ok) {
                    console.log('Password update successful');
                showNotification('Password changed successfully!');
                settingsModal.style.display = 'none';
                    // Clear the form
                    document.getElementById('currentPassword').value = '';
                    document.getElementById('newPassword').value = '';
            } else {
                    console.error('Password update failed with status:', response.status);
                    let errorMessage = 'Failed to update password. Please try again.';
                    try {
                        const errorData = await response.json();
                        console.log('Password update error response:', errorData);
                        errorMessage = errorData.message || errorMessage;
                    } catch (parseError) {
                        console.error('Error parsing password update response:', parseError);
                    }
                    showError(errorMessage);
                }
            } catch (error) {
                console.error('Network error during password update:', error);
                showError('Network error. Please check your connection and try again.');
            } finally {
                submitButton.innerHTML = '<span>Change Password</span><div class="btn-glow"></div>';
                submitButton.disabled = false;
                console.log('Password update process completed');
            }
        });
    }

    function showNotification(message) {
        const notification = document.getElementById('copyNotification');
        notification.querySelector('.notification-text').textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Handler functions for profile updates
    async function handleNameUpdate(firstName, lastName, token) {
                console.log('Making API request to update profile...');
        const response = await fetch(`${window.API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                        firstName,
                lastName
                })
            });

                console.log('Response received:', response.status, response.statusText);

            if (response.ok) {
                    console.log('Profile update successful');
                    const responseData = await response.json();
                    console.log('Profile update response data:', responseData);
                    
                    // Try to extract updated user data from server response
                    let serverUserData = null;
                    
                    if (responseData.user && responseData.user.firstName && responseData.user.email) {
                        serverUserData = responseData.user;
                        console.log('Using server response user data');
                    } else if (responseData.firstName && responseData.email) {
                        serverUserData = responseData;
                        console.log('Using direct server response data');
                    }
                    
                    // Get current user data from storage
                    const result = await chrome.storage.local.get(['user']);
                    
                    // Create updated user object with priority: server data > form data > existing data
                    const updatedUser = {
                        ...(result.user || {}),
                        firstName: serverUserData?.firstName || firstName,
                        lastName: serverUserData?.lastName || lastName,
                email: serverUserData?.email || result.user?.email, // Don't update email via this endpoint
                        // Preserve other fields that might exist
                        id: result.user?.id || serverUserData?.id
                    };
                    
                    console.log('Final updated user object:', updatedUser);
                    await chrome.storage.local.set({ user: updatedUser });
                    
                    // Verify the storage update
                    const verifyResult = await chrome.storage.local.get(['user']);
                    console.log('Storage verification after update:', verifyResult.user);
                    
                    // Update the profile display immediately
                    const profileName = document.getElementById('profileName');
                    const profileEmail = document.getElementById('profileEmail');
                    if (profileName && profileEmail) {
                        const displayName = `${firstName} ${lastName}`.trim();
                        console.log('Updating profile display:', {
                            firstName: firstName,
                            lastName: lastName,
                            displayName: displayName,
                    email: updatedUser.email
                        });
                        profileName.textContent = displayName;
                profileEmail.textContent = updatedUser.email;
                        
                        // Force a DOM refresh
                        profileName.style.display = 'none';
                        profileName.offsetHeight; // Trigger reflow
                        profileName.style.display = '';
                        
                        console.log('Profile display updated:', {
                            profileNameContent: profileName.textContent,
                            profileEmailContent: profileEmail.textContent
                        });
                    } else {
                        console.error('Profile display elements not found');
                    }
                    
                    // Refresh the entire profile to ensure consistency
                    setTimeout(async () => {
                        await refreshProfileDisplay();
                    }, 100);
                    
                showNotification('Profile updated successfully!');
            const settingsModal = document.getElementById('settingsModal');
            if (settingsModal) settingsModal.style.display = 'none';
                    
            } else {
                    console.error('Profile update failed with status:', response.status);
                    
                    // Handle authentication errors
                    if (response.status === 401 || response.status === 403) {
                        console.log('Authentication error, redirecting to login');
                        await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
                        window.location.href = 'login.html';
                        return;
                    }
                    
                    let errorMessage = 'Failed to update profile. Please try again.';
                    try {
                        const errorData = await response.json();
                        console.log('Error response data:', errorData);
                        errorMessage = errorData.message || errorMessage;
                        
                        // Handle specific error cases
                if (response.status === 400) {
                            errorMessage = 'Invalid data: Please check that all fields are filled correctly.';
                        } else if (response.status >= 500) {
                            errorMessage = 'Server error: Please try again later.';
                        }
                    } catch (parseError) {
                        console.error('Error parsing response:', parseError);
                        
                        // If we can't parse the response, provide a generic error based on status
                if (response.status === 400) {
                            errorMessage = 'Invalid request: Please check your input data.';
                        } else if (response.status >= 500) {
                            errorMessage = 'Server error: Please try again later.';
                        }
                    }
                    
                    showError(errorMessage);
                }
    }
    
    async function handleEmailUpdate(newEmail, token, firstName, lastName) {
        try {
            console.log('Initiating email update with OTP...');
            const response = await fetch(`${window.API_BASE_URL}/api/auth/profile/email/initiate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    newEmail
                })
            });

            if (response.ok) {
                console.log('OTP sent successfully');
                showNotification('Verification code sent to your new email address!');
                
                // Show OTP input prompt
                const otp = prompt('Enter the 6-digit verification code sent to your new email:');
                if (otp) {
                    await verifyEmailOTP(newEmail, otp, token, firstName, lastName);
                } else {
                    showError('Email update cancelled.');
                }
            } else {
                const error = await response.json();
                console.error('Email initiation failed:', error);
                showError(error.message || 'Failed to send verification code. Please try again.');
            }
        } catch (error) {
            console.error('Error initiating email update:', error);
            showError('Network error during email update. Please try again.');
        }
    }
    
    async function verifyEmailOTP(newEmail, otp, token, firstName, lastName) {
        try {
            console.log('Verifying email OTP...');
            const response = await fetch(`${window.API_BASE_URL}/api/auth/profile/email/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    newEmail,
                    otp
                })
            });

            if (response.ok) {
                console.log('Email verification successful');
                const responseData = await response.json();
                
                if (responseData.user) {
                    // Update localStorage with server response
                    const result = await chrome.storage.local.get(['user']);
                    const updatedUser = {
                        ...(result.user || {}),
                        firstName: firstName,
                        lastName: lastName,
                        email: responseData.user.email,
                        id: result.user?.id || responseData.user.id
                    };
                    
                    await chrome.storage.local.set({ user: updatedUser });
                    
                    // Update profile display
                    const profileName = document.getElementById('profileName');
                    const profileEmail = document.getElementById('profileEmail');
                    if (profileName && profileEmail) {
                        profileName.textContent = `${firstName} ${lastName}`.trim();
                        profileEmail.textContent = responseData.user.email;
                    }
                    
                    // Refresh the entire profile to ensure consistency
                    setTimeout(async () => {
                        await refreshProfileDisplay();
                    }, 100);
                }
                
                showNotification('Email updated successfully!');
                const settingsModal = document.getElementById('settingsModal');
                if (settingsModal) settingsModal.style.display = 'none';
            } else {
                const error = await response.json();
                console.error('Email verification failed:', error);
                showError(error.message || 'Invalid verification code. Please try again.');
                }
            } catch (error) {
            console.error('Error verifying email:', error);
            showError('Network error during verification. Please try again.');
        }
    }
});

// Helper function to refresh profile display from storage
async function refreshProfileDisplay() {
    try {
        const result = await chrome.storage.local.get(['user']);
        if (result.user) {
            const profileName = document.getElementById('profileName');
            const profileEmail = document.getElementById('profileEmail');
            
            if (profileName && profileEmail) {
                const firstName = result.user.firstName || '';
                const lastName = result.user.lastName || '';
                const fullName = `${firstName} ${lastName}`.trim();
                profileName.textContent = fullName;
                profileEmail.textContent = result.user.email || '';
                
                console.log('Profile display refreshed:', {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: fullName,
                    email: result.user.email,
                    actualDisplayName: profileName.textContent,
                    actualDisplayEmail: profileEmail.textContent
                });
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error refreshing profile display:', error);
        return false;
    }
}

async function loadUserProfile() {
    try {
        // First try to get fresh data from server
        const token = await getAuthToken();
        if (token) {
            try {
                console.log('Fetching fresh profile data from server...');
                const response = await fetch(`${window.API_BASE_URL}/api/user/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const responseData = await response.json();
                    let user = responseData.user;
                    
                    // Handle different server response formats
                    console.log('Raw server response for profile:', responseData);
                    
                    // Try to extract user data from different possible response formats
                    let userData = null;
                    
                    if (user && user.firstName && user.email) {
                        // Standard user object format
                        userData = user;
                        console.log('Using standard user object format');
                    } else if (responseData.firstName && responseData.email) {
                        // Direct response format (EC2 server might return data directly)
                        userData = responseData;
                        console.log('Using direct response format');
                    } else if (responseData.data && responseData.data.firstName && responseData.data.email) {
                        // Nested data format
                        userData = responseData.data;
                        console.log('Using nested data format');
                    }
                    
                    // Special handling for EC2 server returning JWT data instead of user data
                    if (user && user.iat && user.exp && !user.firstName) {
                        console.log('DETECTED: EC2 server returned JWT data instead of user profile data');
                        console.log('JWT data received:', user);
                        console.log('This indicates the EC2 server needs to be updated with the latest backend code');
                        
                        // Show user a notification about the server issue
                        showNotification('Server needs update. Profile data may be incomplete until server is updated.');
                        
                        // EC2 server is returning JWT payload, fall back to local storage
                        userData = null;
                    }
                    
                    if (userData && userData.firstName && userData.email) {
                        // Ensure lastName exists (even if empty)
                        if (!userData.lastName) {
                            userData.lastName = '';
                            console.log('lastName was missing, set to empty string');
                        }
                        
                        console.log('Got valid profile data from server:', userData);
                        
                        // Update local storage with fresh data
                        await chrome.storage.local.set({ user: userData });
                        
                        // Update display
                        const profileName = document.getElementById('profileName');
                        const profileEmail = document.getElementById('profileEmail');
                        if (profileName && profileEmail) {
                            const fullName = `${userData.firstName} ${userData.lastName}`.trim();
                            profileName.textContent = fullName;
                            profileEmail.textContent = userData.email;
                            console.log('Server profile display updated with:', {
                                firstName: `"${userData.firstName}"`,
                                lastName: `"${userData.lastName}"`,
                                fullName: `"${fullName}"`,
                                email: userData.email
                            });
                            console.log('Server profile final display values:', {
                                profileNameText: profileName.textContent,
                                profileEmailText: profileEmail.textContent
                            });
                        } else {
                            console.error('Profile display elements not found in server update');
                        }
                        return; // Successfully loaded from server
                    } else {
                        console.log('Server returned invalid profile data, falling back to local storage');
                        console.log('Checked formats:', {
                            standardUser: user,
                            directResponse: responseData.firstName ? 'has firstName' : 'no firstName',
                            nestedData: responseData.data ? 'has data' : 'no data',
                            isJWTData: user && user.iat && user.exp ? 'YES - EC2 server issue' : 'NO'
                        });
                    }
                } else {
                    console.log('Failed to fetch profile from server, falling back to local storage');
                }
            } catch (serverError) {
                console.log('Error fetching from server, falling back to local storage:', serverError);
            }
        }
        
        // Fallback to local storage
        console.log('Loading profile from local storage...');
        const result = await chrome.storage.local.get(['user']);
        if (result.user) {
            const profileName = document.getElementById('profileName');
            const profileEmail = document.getElementById('profileEmail');
            
            if (profileName && profileEmail) {
                const firstName = result.user.firstName || '';
                const lastName = result.user.lastName || '';
                const fullName = `${firstName} ${lastName}`.trim();
                profileName.textContent = fullName;
                profileEmail.textContent = result.user.email || '';
                console.log('Profile loaded from local storage:', result.user);
                console.log('Display updated with:', {
                    firstName: `"${firstName}"`,
                    lastName: `"${lastName}"`,
                    fullName: `"${fullName}"`,
                    email: result.user.email
                });
                console.log('Final display values:', {
                    profileNameText: profileName.textContent,
                    profileEmailText: profileEmail.textContent
                });
            } else {
                console.error('Profile display elements not found in local storage update');
            }
            
            // Add event listeners for profile menu items
            const accountButton = document.getElementById('accountButton');
            const historyButton = document.getElementById('historyButton');
            const settingsButton = document.getElementById('settingsButton');
            const logoutButtonProfile = document.getElementById('logoutButtonProfile');
            
            if (accountButton) {
                accountButton.addEventListener('click', () => {
                    console.log('Account clicked');
                    // Handle account functionality
                    document.getElementById('profileDropdown').classList.remove('show');
                });
            }
            
            if (historyButton) {
                historyButton.addEventListener('click', () => {
                    console.log('History clicked');
                    try {
                        window.location.href = 'history.html';
                    } catch (error) {
                        console.error('Navigation to history failed:', error);
                        showError('Unable to navigate to history page.');
                    }
                    document.getElementById('profileDropdown').classList.remove('show');
                });
            }
            
            if (settingsButton) {
                settingsButton.addEventListener('click', () => {
                    console.log('Settings clicked');
                    // Handle settings functionality
                    document.getElementById('profileDropdown').classList.remove('show');
                });
            }
            
            if (logoutButtonProfile) {
                logoutButtonProfile.addEventListener('click', async () => {
                    try {
                        // Clear all authentication data
                        await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
                        window.location.href = 'login.html';
                    } catch (error) {
                        console.error('Logout failed:', error);
                        showError('Logout failed. Please try again.');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

// Authentication functions
async function checkAuthStatus() {
    try {
        console.log('Checking authentication status...');
        const result = await chrome.storage.local.get(['isLoggedIn', 'user', 'token', 'loginTimestamp']);
        
        console.log('Storage data retrieved:', {
            isLoggedIn: result.isLoggedIn,
            hasUser: !!result.user,
            hasToken: !!result.token,
            loginTimestamp: result.loginTimestamp
        });
        
        // Check if we have all required authentication data
        const hasAuthData = result.isLoggedIn && result.user && result.token;
        
        if (!hasAuthData) {
            console.log('Missing authentication data:', {
                isLoggedIn: !!result.isLoggedIn,
                hasUser: !!result.user,
                hasToken: !!result.token
            });
            return false;
        }
        
        // Additional validation - check if token is not empty
        if (typeof result.token !== 'string' || result.token.trim().length === 0) {
            console.log('Invalid token format');
            return false;
        }
        
        // Optional: Check if login is not too old (e.g., 90 days for better persistence)
        if (result.loginTimestamp) {
            const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
            const isSessionExpired = (Date.now() - result.loginTimestamp) > ninetyDaysInMs;
            
            if (isSessionExpired) {
                console.log('Session expired, clearing auth data');
                await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
                return false;
            }
        }
        
        console.log('Authentication check passed');
        return true;
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

async function getAuthToken() {
    try {
        const result = await chrome.storage.local.get(['token']);
        return result.token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
}

// Debug function to check storage state
window.debugStorage = async function() {
    try {
        const allData = await chrome.storage.local.get(null);
        console.log('All storage data:', allData);
        
        const authData = await chrome.storage.local.get(['isLoggedIn', 'user', 'token', 'loginTimestamp']);
        console.log('Auth-specific data:', authData);
        
        return authData;
    } catch (error) {
        console.error('Error reading storage:', error);
        return null;
    }
};

// Debug function to manually set auth state
window.debugSetAuth = async function(user, token) {
    try {
        await chrome.storage.local.set({
            user: user || { firstName: 'Test', lastName: 'User', email: 'test@example.com' },
            token: token || 'test-token-123',
            isLoggedIn: true,
            loginTimestamp: Date.now()
        });
        console.log('Auth state set successfully');
        return true;
    } catch (error) {
        console.error('Error setting auth state:', error);
        return false;
    }
};

// Debug function to clear auth state
window.debugClearAuth = async function() {
    try {
        await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
        console.log('Auth state cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing auth state:', error);
        return false;
    }
};

// Debug function to test profile update manually
window.debugTestProfileUpdate = async function(firstName = 'TestFirst', lastName = 'TestLast', email = 'test@example.com') {
    console.log('=== DEBUGGING PROFILE UPDATE ===');
    console.log('Input parameters:', { firstName, lastName, email });
    
    try {
        const token = await getAuthToken();
        if (!token) {
            console.error('No authentication token found');
            return { error: 'No token' };
        }
        
        console.log('Token found, making API request...');
        const response = await fetch(`${window.API_BASE_URL}/api/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email
            })
        });
        
        console.log('API Response status:', response.status);
        
        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response data:', responseData);
            
            // Update local storage
            const result = await chrome.storage.local.get(['user']);
            const updatedUser = {
                ...(result.user || {}),
                firstName,
                lastName,
                email
            };
            
            console.log('Before storage update:', result.user);
            await chrome.storage.local.set({ user: updatedUser });
            
            // Verify storage
            const verifyResult = await chrome.storage.local.get(['user']);
            console.log('After storage update:', verifyResult.user);
            
            // Update UI
            const profileName = document.getElementById('profileName');
            const profileEmail = document.getElementById('profileEmail');
            
            if (profileName && profileEmail) {
                const displayName = `${firstName} ${lastName}`.trim();
                console.log('Updating UI with:', displayName, email);
                
                profileName.textContent = displayName;
                profileEmail.textContent = email;
                
                console.log('UI updated. Current values:');
                console.log('profileName.textContent =', profileName.textContent);
                console.log('profileEmail.textContent =', profileEmail.textContent);
                
                return { 
                    success: true, 
                    uiValues: {
                        name: profileName.textContent,
                        email: profileEmail.textContent
                    },
                    storageData: verifyResult.user
                };
            } else {
                console.error('UI elements not found');
                return { error: 'UI elements not found' };
            }
        } else {
            console.error('API request failed:', response.status);
            return { error: `API failed with status ${response.status}` };
        }
    } catch (error) {
        console.error('Test function error:', error);
        return { error: error.message };
    }
};

// Function to manually set profile data (useful while EC2 server is being fixed)
window.setProfileData = async function(firstName, lastName, email) {
    try {
        const currentUser = await chrome.storage.local.get(['user']);
        const updatedUser = {
            ...(currentUser.user || {}),
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        
        await chrome.storage.local.set({ user: updatedUser });
        await refreshProfileDisplay();
        
        console.log('Profile data manually set:', updatedUser);
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error('Error setting profile data:', error);
        return { success: false, error: error.message };
    }
};

// Debug function to check current profile state
window.debugProfileState = async function() {
    console.log('=== CURRENT PROFILE STATE DEBUG ===');
    
    try {
        // Check storage
        const storageData = await chrome.storage.local.get(['user', 'token', 'isLoggedIn']);
        console.log('Storage data:', storageData);
        
        // Check UI elements
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const updateFirstName = document.getElementById('updateFirstName');
        const updateLastName = document.getElementById('updateLastName');
        const updateEmail = document.getElementById('updateEmail');
        
        console.log('UI Elements found:', {
            profileName: !!profileName,
            profileEmail: !!profileEmail,
            updateFirstName: !!updateFirstName,
            updateLastName: !!updateLastName,
            updateEmail: !!updateEmail
        });
        
        if (profileName && profileEmail) {
            console.log('Current display values:', {
                profileName: profileName.textContent,
                profileEmail: profileEmail.textContent
            });
        }
        
        if (updateFirstName && updateLastName && updateEmail) {
            console.log('Current form values:', {
                firstName: updateFirstName.value,
                lastName: updateLastName.value,
                email: updateEmail.value
            });
        }
        
        // Check server data
        const token = await getAuthToken();
        if (token) {
            try {
                console.log('Fetching current server data...');
                const response = await fetch(`${window.API_BASE_URL}/api/user/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.ok) {
                    const serverData = await response.json();
                    console.log('Server response:', serverData);
                } else {
                    console.log('Server request failed:', response.status);
                }
            } catch (serverError) {
                console.log('Server request error:', serverError);
            }
        } else {
            console.log('No authentication token available');
        }
        
        return {
            storage: storageData,
            ui: {
                display: profileName ? {
                    name: profileName.textContent,
                    email: profileEmail ? profileEmail.textContent : 'not found'
                } : 'elements not found',
                form: updateFirstName ? {
                    firstName: updateFirstName.value,
                    lastName: updateLastName ? updateLastName.value : 'not found',
                    email: updateEmail ? updateEmail.value : 'not found'
                } : 'elements not found'
            }
        };
    } catch (error) {
        console.error('Debug function error:', error);
        return { error: error.message };
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const historyContainer = document.getElementById('historyContainer');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const copyNotification = document.getElementById('copyNotification');

    // Set dark mode as default
    document.body.classList.add('dark-mode');

    backButton.addEventListener('click', () => {
        try {
            // Direct navigation should work in side panel context
            window.location.href = 'sidepanel.html';
        } catch (error) {
            console.error('Navigation failed:', error);
            // Fallback method
            window.location.assign('sidepanel.html');
        }
    });

    clearHistoryBtn.addEventListener('click', () => {
        // Ask for confirmation before clearing
        if (confirm('Are you sure you want to clear all prompt history? This cannot be undone.')) {
            chrome.storage.local.set({promptHistory: []}, () => {
                // Refresh the view
                loadAndDisplayHistory();
                console.log('Prompt history cleared.');
            });
        }
    });

    // Function to show copy notification
    function showCopyNotification() {
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
    }

    // Function to format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }

    // Function to create a collapsible history item
    function createHistoryItem(item) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.id = item.id;

        const headerElement = document.createElement('div');
        headerElement.className = 'history-header';

        const timestamp = new Date(item.timestamp).toLocaleString();

        headerElement.innerHTML = `
            <div class="prompt-timestamp-top">${timestamp}</div>
            <div class="prompt-content-row">
                <div class="prompt-info">
                    <div class="prompt-title">${item.input}</div>
                </div>
                <div class="prompt-actions">
                    <button class="expand-fullscreen-btn" title="View in Fullscreen">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="delete-btn" title="Delete this prompt">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Create hidden content for fullscreen (contains the generated prompt)
        const hiddenContent = document.createElement('div');
        hiddenContent.className = 'hidden-content';
        hiddenContent.innerHTML = `<div class="full-prompt-content">${item.output}</div>`;

        // Add direct fullscreen functionality
        const expandFullscreenBtn = headerElement.querySelector('.expand-fullscreen-btn');
        expandFullscreenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleHistoryItemFullscreen(historyItem);
        });

        // Add delete functionality
        const deleteBtn = headerElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await deleteHistoryItem(item.id);
            historyItem.remove();
            checkEmptyState();
        });

        historyItem.appendChild(headerElement);
        historyItem.appendChild(hiddenContent);
        
        return historyItem;
    }

    // Function to handle fullscreen toggle for a history item
    function handleHistoryItemFullscreen(historyItem) {
        const isFullscreen = historyItem.classList.contains('fullscreen');

        document.body.classList.toggle('fullscreen-active');
        document.documentElement.classList.toggle('fullscreen-active'); // Add to HTML element too
        historyItem.classList.toggle('fullscreen');

        const expandFullscreenBtn = historyItem.querySelector('.expand-fullscreen-btn');
        const hiddenContent = historyItem.querySelector('.hidden-content');
        const promptContent = hiddenContent?.querySelector('.full-prompt-content');
        
        // Extract text content safely before DOM manipulation
        const promptText = promptContent ? promptContent.textContent || '' : '';
        
        // Get the original input text from the prompt title
        const originalInput = historyItem.querySelector('.prompt-title')?.textContent || '';
        
        if (!isFullscreen) {
            // Entering fullscreen - change to "Collapse" and show content
            if (expandFullscreenBtn) {
            expandFullscreenBtn.setAttribute('title', 'Exit Fullscreen');
            expandFullscreenBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 19h3a2 2 0 0 0 2-2v-3m0-6V5a2 2 0 0 0-2-2H5m14 0h-3a2 2 0 0 0-2 2v3m0 6v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            
            // Add fullscreen content with back button, copy button and raw description
            hiddenContent.innerHTML = `
                <div class="fullscreen-content">
                    <button class="fullscreen-back-btn" title="Back to History">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    
                    <div class="raw-description-section">
                        <div class="raw-description-header">
                            <h3>Original Description</h3>
                            <button class="copy-raw-btn" title="Copy raw description">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                Copy
                            </button>
                        </div>
                        <div class="raw-description-text" tabindex="0">${originalInput}</div>
                    </div>
                    
                    <div class="generated-prompt-section">
                    <div class="fullscreen-header">
                            <h3>Super Prompt</h3>
                            <button class="copy-fullscreen-btn" title="Copy super prompt">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            Copy
                        </button>
                        </div>
                        <div class="fullscreen-prompt-text" tabindex="0">${promptText}</div>
                    </div>
                </div>
            `;
            
            // Attach enhanced scroll features
            const rawDescriptionText = hiddenContent.querySelector('.raw-description-text');
            const fullscreenPrompt = hiddenContent.querySelector('.fullscreen-prompt-text');
            
            // Add scroll functionality for raw description section only
            const rawScrollBtn = createRawDescriptionScrollButton(rawDescriptionText);
            
            // Store references for later removal
            historyItem._rawScrollBtn = rawScrollBtn;
            
            // Add enhanced keyboard navigation for both sections
            if (rawDescriptionText) {
                setupEnhancedKeyboardNavigation(rawDescriptionText);
            }
            if (fullscreenPrompt) {
                setupEnhancedKeyboardNavigation(fullscreenPrompt);
            }
            
            // Force scrollbar updates for both sections
            setTimeout(() => {
                if (rawDescriptionText) {
                    forceScrollbarUpdate(rawDescriptionText);
                }
                if (fullscreenPrompt) {
                    forceScrollbarUpdate(fullscreenPrompt);
                }
                
                // Trigger scroll button checks after content is updated
                if (historyItem._rawScrollBtn && rawDescriptionText) {
                    // Force a check of the raw description scroll button
                    const event = new Event('scroll');
                    rawDescriptionText.dispatchEvent(event);
                }
                
                // Focus the generated prompt by default
                if (fullscreenPrompt) {
                    fullscreenPrompt.focus();
                }
                
                // Additional debug info for raw description
                if (rawDescriptionText) {
                    console.log('Final raw description setup:', {
                        element: rawDescriptionText,
                        scrollHeight: rawDescriptionText.scrollHeight,
                        clientHeight: rawDescriptionText.clientHeight,
                        isScrollable: rawDescriptionText.scrollHeight > rawDescriptionText.clientHeight,
                        hasContent: rawDescriptionText.textContent?.length || 0
                    });
                }
            }, 150);
            
            // Add back button functionality
            const backBtn = hiddenContent.querySelector('.fullscreen-back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Exit fullscreen by calling the same function again
                    handleHistoryItemFullscreen(historyItem);
                });
            }

            // Add copy functionality for raw description
            const copyRawBtn = hiddenContent.querySelector('.copy-raw-btn');
            if (copyRawBtn) {
                copyRawBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                navigator.clipboard.writeText(originalInput).then(() => {
                    showCopyNotification();
                    
                    // Brief button feedback
                    const originalHTML = copyRawBtn.innerHTML;
                    copyRawBtn.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Copied!
                    `;
                    copyRawBtn.style.color = 'var(--success-color)';
                    
                    setTimeout(() => {
                        copyRawBtn.innerHTML = originalHTML;
                        copyRawBtn.style.color = '';
                    }, 1500);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showCopyNotification();
                });
            });
            }
            
            // Add copy functionality for generated prompt
            const copyBtn = hiddenContent.querySelector('.copy-fullscreen-btn');
            if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                navigator.clipboard.writeText(promptText).then(() => {
                    showCopyNotification();
                    
                    // Brief button feedback
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Copied!
                    `;
                    copyBtn.style.color = 'var(--success-color)';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        copyBtn.style.color = '';
                    }, 1500);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    showCopyNotification();
                });
            });
            }
            }
            
        } else {
            // Exiting fullscreen - change back to "Fullscreen" and hide content
            if (expandFullscreenBtn) {
            expandFullscreenBtn.setAttribute('title', 'View in Fullscreen');
            expandFullscreenBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            }
            
            // Reset hidden content
            if (hiddenContent) {
                hiddenContent.innerHTML = `<div class="full-prompt-content">${promptText}</div>`;
            }
            
            // Remove raw description scroll button if exists
            if (historyItem._rawScrollBtn) {
                historyItem._rawScrollBtn.remove();
                delete historyItem._rawScrollBtn;
            }
        }
    }

    // Helper to create scroll-to-top button for fullscreen view
    function createFullscreenScrollButton(scrollContainer) {
        if (!scrollContainer) return null;
        
        console.log('Creating enhanced fullscreen scroll button for:', scrollContainer);
        
        // Create button element
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.title = 'Scroll to top of generated content';
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        document.body.appendChild(btn);

        // Show/hide button based on scroll position
        function toggleVisibility() {
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight;
            const clientHeight = scrollContainer.clientHeight;
            const isScrollable = scrollHeight > clientHeight;
            const scrollThreshold = Math.min(200, clientHeight * 0.3); // Adaptive threshold
            
            console.log('Generated content scroll check:', {
                scrollTop,
                scrollHeight,
                clientHeight,
                isScrollable,
                threshold: scrollTop > scrollThreshold,
                adaptiveThreshold: scrollThreshold
            });
            
            if (isScrollable && scrollTop > scrollThreshold) {
                btn.classList.add('show');
                console.log('Showing generated content scroll button');
            } else {
                btn.classList.remove('show');
                console.log('Hiding generated content scroll button');
            }
        }
        
        // Initial check with delay
        setTimeout(toggleVisibility, 200);
        
        let scrollTimeout;
        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(toggleVisibility, 50);
        });

        // Scroll to top on click with enhanced animation
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Generated content scroll button clicked');
            
            // Add click animation
            btn.style.transform = 'scale(0.95) translateY(-2px)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        });

        return btn;
    }

    // Helper to create scroll-to-top button for raw description section
    function createRawDescriptionScrollButton(scrollContainer) {
        if (!scrollContainer) return null;
        
        console.log('Creating raw description scroll button for:', scrollContainer);
        
        // Create button element
        const btn = document.createElement('button');
        btn.className = 'raw-scroll-top-btn';
        btn.title = 'Scroll to top of raw description';
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        document.body.appendChild(btn);

        // Show/hide button based on scroll position
        function toggleVisibility() {
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight;
            const clientHeight = scrollContainer.clientHeight;
            const isScrollable = scrollHeight > clientHeight;
            
            console.log('Raw scroll check:', {
                scrollTop,
                scrollHeight,
                clientHeight,
                isScrollable,
                threshold: scrollTop > 20
            });
            
            if (isScrollable && scrollTop > 20) {
                btn.classList.add('show');
                console.log('Showing raw scroll button');
            } else {
                btn.classList.remove('show');
                console.log('Hiding raw scroll button');
            }
        }
        
        // Initial check
        setTimeout(toggleVisibility, 100);
        
        let scrollTimeout;
        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(toggleVisibility, 50);
        });

        // Scroll to top on click
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Raw scroll button clicked');
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        });

        return btn;
    }

    // Function to delete a specific history item
    function deleteHistoryItem(idToDelete) {
        chrome.storage.local.get({promptHistory: []}, (data) => {
            const history = data.promptHistory;
            
            // Remove the item with the specified id
            const indexToDelete = history.findIndex(item => item.id === idToDelete);
            
            if (indexToDelete !== -1) {
                history.splice(indexToDelete, 1);
                
                // Save the updated history
                chrome.storage.local.set({promptHistory: history}, () => {
                    // Refresh the view
                    loadAndDisplayHistory();
                    console.log(`History item with id ${idToDelete} deleted.`);
                });
            }
        });
    }

    // Function to create empty state
    function createEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-icon">📝</div>
            <div class="empty-title">No prompt history yet</div>
            <div class="empty-description">
                Your generated prompts will appear here.<br>
                Create your first prompt to get started!
            </div>
        `;
        return emptyState;
    }

    // Function to load and display history
    function loadAndDisplayHistory() {
        chrome.storage.local.get({promptHistory: []}, (data) => {
            const history = data.promptHistory;
            historyContainer.innerHTML = ''; // Clear previous content

            if (history.length === 0) {
                historyContainer.appendChild(createEmptyState());
                return;
            }

            // Display in reverse chronological order (newest first)
            for (let i = history.length - 1; i >= 0; i--) {
                const item = history[i];
                const historyItem = createHistoryItem(item);
                historyContainer.appendChild(historyItem);
            }
        });
    }

    // Setup scrolling for individual output text areas
    function setupOutputTextScrolling(outputElement) {
        if (!outputElement) return;
        
        // Function to update scroll indicators for output text
        function updateOutputScrollIndicators() {
            const scrollTop = outputElement.scrollTop;
            const scrollHeight = outputElement.scrollHeight;
            const clientHeight = outputElement.clientHeight;
            const scrollBottom = scrollHeight - clientHeight - scrollTop;
            
            // Remove existing classes
            outputElement.classList.remove('scrolled-top', 'scrolled-bottom', 'has-scroll');
            
            // Check if content is scrollable
            if (scrollHeight > clientHeight) {
                outputElement.classList.add('has-scroll');
                
                // Show top fade when scrolled down
                if (scrollTop > 10) {
                    outputElement.classList.add('scrolled-top');
                }
                
                // Show bottom fade when not at bottom
                if (scrollBottom > 10) {
                    outputElement.classList.add('scrolled-bottom');
                }
            }
        }
        
        // Add scroll event listener
        let outputScrollTimeout;
        outputElement.addEventListener('scroll', () => {
            clearTimeout(outputScrollTimeout);
            outputScrollTimeout = setTimeout(updateOutputScrollIndicators, 10);
        });
        
        // Keyboard navigation for output text
        outputElement.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowDown':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        outputElement.scrollBy({ top: 50, behavior: 'smooth' });
                    }
                    break;
                case 'ArrowUp':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        outputElement.scrollBy({ top: -50, behavior: 'smooth' });
                    }
                    break;
                case 'PageDown':
                    e.preventDefault();
                    outputElement.scrollBy({ top: outputElement.clientHeight * 0.8, behavior: 'smooth' });
                    break;
                case 'PageUp':
                    e.preventDefault();
                    outputElement.scrollBy({ top: -outputElement.clientHeight * 0.8, behavior: 'smooth' });
                    break;
                case 'Home':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        outputElement.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    break;
                case 'End':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        outputElement.scrollTo({ top: outputElement.scrollHeight, behavior: 'smooth' });
                    }
                    break;
            }
        });
        
        // Make output text focusable for keyboard navigation
        outputElement.setAttribute('tabindex', '0');
        
        // Initial check
        setTimeout(updateOutputScrollIndicators, 100);
        
        // Update on window resize
        window.addEventListener('resize', updateOutputScrollIndicators);
    }

    // Enhanced scroll functionality
    function setupScrollEnhancements() {
        const historySection = document.querySelector('.history-section');
        
        // Function to update scroll fade indicators
        function updateScrollIndicators() {
            const scrollTop = historyContainer.scrollTop;
            const scrollHeight = historyContainer.scrollHeight;
            const clientHeight = historyContainer.clientHeight;
            const scrollBottom = scrollHeight - clientHeight - scrollTop;
            
            // Show top fade when scrolled down
            if (scrollTop > 10) {
                historySection.classList.add('scrolled-top');
            } else {
                historySection.classList.remove('scrolled-top');
            }
            
            // Hide bottom fade when at bottom
            if (scrollBottom < 10) {
                historySection.classList.add('scrolled-bottom');
            } else {
                historySection.classList.remove('scrolled-bottom');
            }
        }
        
        // Add scroll event listener with throttling
        let scrollTimeout;
        historyContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateScrollIndicators, 10);
        });
        
        // Update indicators on resize
        window.addEventListener('resize', updateScrollIndicators);
        
        // Initial check
        setTimeout(updateScrollIndicators, 100);
        
        // Keyboard scroll support
        historyContainer.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    historyContainer.scrollBy({ top: 100, behavior: 'smooth' });
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    historyContainer.scrollBy({ top: -100, behavior: 'smooth' });
                    break;
                case 'PageDown':
                    e.preventDefault();
                    historyContainer.scrollBy({ top: historyContainer.clientHeight * 0.8, behavior: 'smooth' });
                    break;
                case 'PageUp':
                    e.preventDefault();
                    historyContainer.scrollBy({ top: -historyContainer.clientHeight * 0.8, behavior: 'smooth' });
                    break;
                case 'Home':
                    e.preventDefault();
                    historyContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    historyContainer.scrollTo({ top: historyContainer.scrollHeight, behavior: 'smooth' });
                    break;
            }
        });
        
        // Make container focusable for keyboard navigation
        historyContainer.setAttribute('tabindex', '0');
    }
    
    // Auto-scroll to newest item when new content is added
    function scrollToTop() {
        setTimeout(() => {
            historyContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }

    // Create scroll position indicator for fullscreen
    function createScrollIndicator(scrollContainer) {
        if (!scrollContainer) return null;
        
        const indicator = document.createElement('div');
        indicator.className = 'fullscreen-scroll-indicator';
        
        const thumb = document.createElement('div');
        thumb.className = 'fullscreen-scroll-thumb';
        indicator.appendChild(thumb);
        
        document.body.appendChild(indicator);
        
        function updateIndicator() {
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight;
            const clientHeight = scrollContainer.clientHeight;
            
            if (scrollHeight <= clientHeight) {
                indicator.classList.remove('show');
                return;
            }
            
            indicator.classList.add('show');
            
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
            const thumbHeight = Math.max((clientHeight / scrollHeight) * 200, 20);
            const thumbTop = scrollPercentage * (200 - thumbHeight);
            
            thumb.style.height = thumbHeight + 'px';
            thumb.style.top = thumbTop + 'px';
        }
        
        let scrollTimeout;
        scrollContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateIndicator, 10);
        });
        
        // Allow clicking on indicator to jump to position
        indicator.addEventListener('click', (e) => {
            const rect = indicator.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const percentage = clickY / 200;
            const targetScroll = percentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
            scrollContainer.scrollTo({ top: targetScroll, behavior: 'smooth' });
        });
        
        updateIndicator();
        return indicator;
    }

    // Force scrollbar visibility and functionality
    function forceScrollbarUpdate(element) {
        if (!element) return;
        
        const isRawDescription = element.classList.contains('raw-description-text');
        const elementType = isRawDescription ? 'Raw description' : 'Generated prompt';
        
        // Log content info for debugging
        console.log(`${elementType} content height:`, element.scrollHeight);
        console.log(`${elementType} container height:`, element.clientHeight);
        console.log(`${elementType} needs scrolling:`, element.scrollHeight > element.clientHeight);
        
        // Force a reflow to ensure scrollbar is calculated
        element.style.overflow = 'hidden';
        element.offsetHeight; // Force reflow
        element.style.overflow = 'auto';
        
        // For raw description, use smaller padding to test scrollability
        if (element.scrollHeight <= element.clientHeight) {
            console.log(`Adding padding to ensure ${elementType} is scrollable`);
            if (isRawDescription) {
                element.style.paddingBottom = '200px'; // Smaller padding for raw description
            } else {
                element.style.paddingBottom = '100vh';
            }
        }
        
        // Try to trigger a scroll event to initialize scrollbar
        element.scrollTop = 1;
        element.scrollTop = 0;
        
        // Force scrollbar visibility with explicit styling
        if (isRawDescription) {
            element.style.scrollbarWidth = 'auto';
            element.style.msOverflowStyle = 'auto';
        }
    }

    // Enhanced keyboard navigation for fullscreen
    function setupEnhancedKeyboardNavigation(scrollContainer) {
        if (!scrollContainer) return;
        
        scrollContainer.addEventListener('keydown', (e) => {
            const scrollAmount = 50;
            const pageScrollAmount = scrollContainer.clientHeight * 0.8;
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                    } else {
                        scrollContainer.scrollBy({ top: scrollAmount / 2, behavior: 'smooth' });
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (e.ctrlKey || e.metaKey) {
                        scrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                    } else {
                        scrollContainer.scrollBy({ top: -scrollAmount / 2, behavior: 'smooth' });
                    }
                    break;
                case 'PageDown':
                    e.preventDefault();
                    scrollContainer.scrollBy({ top: pageScrollAmount, behavior: 'smooth' });
                    break;
                case 'PageUp':
                    e.preventDefault();
                    scrollContainer.scrollBy({ top: -pageScrollAmount, behavior: 'smooth' });
                    break;
                case 'Home':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    break;
                case 'End':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
                    }
                    break;
                case 'j':
                    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                        e.preventDefault();
                        scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                    }
                    break;
                case 'k':
                    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                        e.preventDefault();
                        scrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                    }
                    break;
                case 'g':
                    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                        e.preventDefault();
                        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    break;
                case 'G':
                    if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                        e.preventDefault();
                        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    if (e.shiftKey) {
                        scrollContainer.scrollBy({ top: -pageScrollAmount, behavior: 'smooth' });
                    } else {
                        scrollContainer.scrollBy({ top: pageScrollAmount, behavior: 'smooth' });
                    }
                    break;
            }
        });
        
        // Add mouse wheel enhancement for smoother scrolling
        scrollContainer.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const deltaY = e.deltaY;
                scrollContainer.scrollBy({ 
                    top: deltaY * 2, 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // Initial load
    loadAndDisplayHistory();
    
    // Setup scroll enhancements after content loads
    setTimeout(setupScrollEnhancements, 200);
}); 
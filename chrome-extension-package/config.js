// Configuration for Prompt Engine Chrome Extension

// API URL - Updated to use the new EC2 unified server
const API_URL = 'http://44.208.217.246';

// Default settings
const DEFAULT_SETTINGS = {
    theme: 'light',
    notifications: true,
    autoSave: true
};

// Make API_URL available globally for non-module scripts
window.API_BASE_URL = API_URL;
window.API_URL = API_URL;

// For module environments
try {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            API_URL,
            DEFAULT_SETTINGS
        };
    } else if (typeof exports !== 'undefined') {
        exports.API_URL = API_URL;
        exports.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
    }
} catch (e) {
    console.log('Running in browser context');
} 
// Authentication check for sidepanel.html
// This script checks if user is logged in and redirects accordingly

(async function() {
    try {
        console.log('Auth-check: Starting authentication verification...');
        
        // Add a small delay to ensure storage is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const result = await chrome.storage.local.get(['isLoggedIn', 'user', 'token', 'loginTimestamp']);
        
        console.log('Auth-check: Storage data retrieved:', {
            isLoggedIn: result.isLoggedIn,
            hasUser: !!result.user,
            hasToken: !!result.token,
            loginTimestamp: result.loginTimestamp
        });
        
        // Check if we have all required authentication data
        const hasAuthData = result.isLoggedIn && result.user && result.token;
        
        if (!hasAuthData) {
            console.log('Auth-check: Missing authentication data, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        
        // Additional validation - check if token is not empty
        if (typeof result.token !== 'string' || result.token.trim().length === 0) {
            console.log('Auth-check: Invalid token format, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        
        // Optional: Check if login is not too old (e.g., 90 days for better persistence)
        if (result.loginTimestamp) {
            const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
            const isSessionExpired = (Date.now() - result.loginTimestamp) > ninetyDaysInMs;
            
            if (isSessionExpired) {
                console.log('Auth-check: Session expired, clearing auth data and redirecting');
                await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
                window.location.href = 'login.html';
                return;
        }
        }
        
        // If user is logged in and session is valid, the page will load normally
        console.log('Auth-check: Authentication verification passed');
    } catch (error) {
        console.error('Auth-check: Error checking auth status:', error);
        // On error, redirect to login
        window.location.href = 'login.html';
    }
})(); 
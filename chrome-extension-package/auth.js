// Authentication system for Prompt Engine
// API_BASE_URL is loaded from config.js

// Debug information
console.log('Auth.js loaded');
console.log('API_BASE_URL:', window.API_BASE_URL);
console.log('API_URL:', window.API_URL);

// Check if we're on register or login page
const isRegisterPage = document.getElementById('registerForm') !== null;
const isLoginPage = document.getElementById('loginForm') !== null;

document.addEventListener('DOMContentLoaded', () => {
    // Set dark mode
    document.body.classList.add('dark-mode');
    
    // Debug information after DOM is loaded
    console.log('DOM loaded in auth.js');
    console.log('API_BASE_URL after DOM load:', window.API_BASE_URL);
    console.log('API_URL after DOM load:', window.API_URL);
    
    if (isRegisterPage) {
        initRegisterPage();
    } else if (isLoginPage) {
        initLoginPage();
    }
});

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    const loginLink = document.getElementById('loginLink');
    
    registerForm.addEventListener('submit', handleRegister);
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
}

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    
    loginForm.addEventListener('submit', handleLogin);
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'register.html';
    });
    
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleForgotPassword();
    });
}

async function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
        showError('Please fill in all fields.');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long.');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    const registerButton = document.getElementById('registerButton');
    registerButton.disabled = true;
    registerButton.textContent = 'Creating Account...';
    
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/auth/register/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store pending verification data
            await chrome.storage.local.set({
                pendingVerification: {
                    email: email,
                    type: 'registration',
                    data: { firstName, lastName, email, password }
                }
            });
            
            showSuccess('Verification code sent to your email! Redirecting...');
            
            setTimeout(() => {
                window.location.href = `verify-otp.html?type=registration&email=${encodeURIComponent(email)}`;
            }, 1500);
        } else {
            showError(data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Network error. Please check your connection and try again.');
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = 'Create Account';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showError('Please fill in all fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = true;
    loginButton.textContent = 'Signing In...';
    
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store user data with consistent keys
            await chrome.storage.local.set({
                user: data.user,
                token: data.token,
                isLoggedIn: true,
                loginTimestamp: Date.now() // Add timestamp for session tracking
            });
            
            showSuccess('Welcome back! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'sidepanel.html';
            }, 1500);
        } else {
            showError(data.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Network error. Please check your connection and try again.');
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Sign In';
    }
}

async function handleForgotPassword() {
    const email = document.getElementById('email').value.trim();
    
    if (!email) {
        showError('Please enter your email address first.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Show confirmation dialog
    const confirmed = confirm(`Send password reset code to ${email}?`);
    if (!confirmed) return;
    
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store pending verification data
            await chrome.storage.local.set({
                pendingVerification: {
                    email: email,
                    type: 'password_reset',
                    data: {}
                }
            });
            
            showSuccess('Password reset code sent! Redirecting...');
            
            setTimeout(() => {
                window.location.href = `verify-otp.html?type=password_reset&email=${encodeURIComponent(email)}`;
            }, 1500);
        } else {
            showSuccess(data.message); // Show the security message even if user doesn't exist
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        showError('Network error. Please check your connection and try again.');
    }
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    successElement.style.display = 'none';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    errorElement.style.display = 'none';
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

function showMessage(message, type = 'info') {
    if (type === 'error') {
        showError(message);
    } else {
        showSuccess(message);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check authentication status when the script loads
async function checkAuthStatus() {
    try {
        const result = await chrome.storage.local.get(['isLoggedIn', 'user', 'token', 'loginTimestamp']);
        
        // Check if we have all required authentication data
        const hasAuthData = result.isLoggedIn && result.user && result.token;
        
        if (!hasAuthData) {
            console.log('Missing authentication data');
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
        
        return true;
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

// Logout function
async function logout() {
    try {
        await chrome.storage.local.remove(['user', 'token', 'isLoggedIn', 'authToken', 'loginTimestamp']);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
} 
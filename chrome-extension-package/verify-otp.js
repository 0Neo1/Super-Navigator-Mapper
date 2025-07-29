// OTP Verification Script
const API_BASE_URL = 'http://44.208.217.246'; // Updated to match the new EC2 backend

// DOM Elements
const otpForm = document.getElementById('otpForm');
const otpInput = document.getElementById('otp');
const verifyBtn = document.getElementById('verifyBtn');
const resendBtn = document.getElementById('resendBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const emailDisplay = document.getElementById('emailDisplay');
const timerSpan = document.getElementById('timer');
const backLink = document.getElementById('backLink');
const loading = document.getElementById('loading');

// State variables
let otpType = 'registration'; // 'registration', 'email_update', 'password_reset'
let email = '';
let pendingData = {};
let resendTimer = 60;
let timerInterval;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    startResendTimer();
});

function initializePage() {
    // Get verification data from URL parameters or storage
    const urlParams = new URLSearchParams(window.location.search);
    otpType = urlParams.get('type') || 'registration';
    email = urlParams.get('email') || '';
    
    // If no email in URL, try to get from storage
    if (!email || otpType === 'registration') {
        chrome.storage.local.get(['pendingVerification'], function(result) {
            if (result.pendingVerification) {
                email = result.pendingVerification.email;
                otpType = result.pendingVerification.type;
                pendingData = result.pendingVerification.data || {};
                
                // Update email display
                if (email) {
                    emailDisplay.textContent = email;
                }
            } else if (!email) {
                // No pending verification data found
                showError('Verification session expired. Please start again.');
                setTimeout(() => {
                    window.location.href = 'register.html';
                }, 2000);
                return;
            }
        });
    }
    
    // Display email if we have it from URL
    if (email) {
        emailDisplay.textContent = email;
    }
    
    // Update page content based on type
    updatePageContent();
    
    // Auto-focus OTP input
    otpInput.focus();
}

function updatePageContent() {
    const titleElement = document.querySelector('h1');
    const subtitleElement = document.querySelector('.subtitle');
    
    switch (otpType) {
        case 'registration':
            titleElement.textContent = 'Verify Your Email';
            subtitleElement.textContent = 'We\'ve sent a 6-digit verification code to your email address. Please enter it below to complete your registration.';
            backLink.textContent = '← Back to Registration';
            backLink.href = 'register.html';
            break;
            
        case 'email_update':
            titleElement.textContent = 'Verify New Email';
            subtitleElement.textContent = 'We\'ve sent a 6-digit verification code to your new email address. Please enter it below to update your email.';
            backLink.textContent = '← Back to Settings';
            backLink.href = 'sidepanel.html';
            break;
            
        case 'password_reset':
            titleElement.textContent = 'Reset Password';
            subtitleElement.textContent = 'We\'ve sent a 6-digit verification code to your email address. Please enter it below to reset your password.';
            backLink.textContent = '← Back to Login';
            backLink.href = 'login.html';
            break;
    }
}

function setupEventListeners() {
    // OTP form submission
    otpForm.addEventListener('submit', handleOTPSubmit);
    
    // OTP input formatting
    otpInput.addEventListener('input', function(e) {
        // Only allow digits
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
        // Auto-submit when 6 digits are entered
        if (e.target.value.length === 6) {
            setTimeout(() => {
                handleOTPSubmit(e);
            }, 100);
        }
    });
    
    // Resend button
    resendBtn.addEventListener('click', handleResendOTP);
    
    // Back link
    backLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Clear pending verification data
        chrome.storage.local.remove(['pendingVerification']);
        window.location.href = this.href;
    });
}

async function handleOTPSubmit(e) {
    e.preventDefault();
    
    const otp = otpInput.value.trim();
    
    if (!otp || otp.length !== 6) {
        showError('Please enter a valid 6-digit code');
        return;
    }
    
    if (!email) {
        showError('Email not found. Please start the process again.');
        return;
    }
    
    showLoading(true);
    hideMessages();
    
    try {
        let endpoint, requestData;
        
        switch (otpType) {
            case 'registration':
                endpoint = '/api/auth/register/verify';
                requestData = { email, otp };
                break;
                
            case 'email_update':
                endpoint = '/api/auth/profile/email/verify';
                requestData = { newEmail: email, otp };
                break;
                
            case 'password_reset':
                // For password reset, we need to redirect to password reset form
                // Store the verified OTP data for the next step
                chrome.storage.local.set({
                    verifiedPasswordReset: {
                        email: email,
                        otp: otp,
                        timestamp: Date.now()
                    }
                });
                showSuccess('Code verified! Redirecting to password reset...');
                setTimeout(() => {
                    window.location.href = `reset-password.html?email=${encodeURIComponent(email)}&otp=${otp}`;
                }, 1500);
                return;
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(otpType === 'email_update' && { 'Authorization': `Bearer ${await getAuthToken()}` })
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            if (otpType === 'registration') {
                // Store auth token and user data
                await chrome.storage.local.set({
                    token: data.token,
                    user: data.user
                });
                
                showSuccess('Registration completed successfully! Redirecting...');
                
                // Clear pending verification data
                chrome.storage.local.remove(['pendingVerification']);
                
                setTimeout(() => {
                    window.location.href = 'login.html?registration_success=true';
                }, 1500);
                
            } else if (otpType === 'email_update') {
                // Update stored user data
                await chrome.storage.local.set({
                    user: data.user
                });
                
                showSuccess('Email updated successfully! Redirecting...');
                
                // Clear pending verification data
                chrome.storage.local.remove(['pendingVerification']);
                
                setTimeout(() => {
                    window.location.href = 'sidepanel.html';
                }, 1500);
            }
        } else {
            showError(data.message || 'Verification failed. Please try again.');
        }
        
    } catch (error) {
        console.error('OTP verification error:', error);
        showError('Network error. Please check your connection and try again.');
    } finally {
        showLoading(false);
    }
}

async function handleResendOTP() {
    if (resendBtn.disabled) return;
    
    showLoading(true);
    hideMessages();
    
    try {
        let endpoint, requestData;
        
        switch (otpType) {
            case 'registration':
                endpoint = '/api/auth/register/initiate';
                // Include all registration data from pendingData
                requestData = {
                    email,
                    firstName: pendingData.firstName,
                    lastName: pendingData.lastName,
                    password: pendingData.password
                };
                break;
                
            case 'email_update':
                endpoint = '/api/auth/profile/email/initiate';
                requestData = { newEmail: email };
                break;
                
            case 'password_reset':
                endpoint = '/api/auth/forgot-password';
                requestData = { email };
                break;
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(otpType === 'email_update' && { 'Authorization': `Bearer ${await getAuthToken()}` })
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('New verification code sent! Please check your email.');
            startResendTimer();
        } else {
            showError(data.message || 'Failed to resend code. Please try again.');
            // Enable resend button immediately if there's an error
            resendTimer = 0;
            clearInterval(timerInterval);
            timerSpan.textContent = '';
            resendBtn.disabled = false;
            resendBtn.classList.add('active');
        }
        
    } catch (error) {
        console.error('Resend OTP error:', error);
        showError('Network error. Please try again.');
        // Enable resend button immediately if there's an error
        resendTimer = 0;
        clearInterval(timerInterval);
        timerSpan.textContent = '';
        resendBtn.disabled = false;
        resendBtn.classList.add('active');
    } finally {
        showLoading(false);
    }
}

function startResendTimer() {
    resendTimer = 60;
    resendBtn.disabled = true;
    resendBtn.classList.remove('active');
    
    clearInterval(timerInterval); // Clear any existing interval
    
    timerInterval = setInterval(() => {
        resendTimer--;
        timerSpan.textContent = `Wait ${resendTimer}s`;
        
        if (resendTimer <= 0) {
            clearInterval(timerInterval);
            timerSpan.textContent = '';
            resendBtn.disabled = false;
            resendBtn.classList.add('active');
            document.querySelector('.resend-text').innerHTML = 'Didn\'t receive the code?';
        }
    }, 1000);
}

async function getAuthToken() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['token'], function(result) {
            resolve(result.token || '');
        });
    });
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function showLoading(show) {
    if (show) {
        loading.style.display = 'block';
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Verifying...';
    } else {
        loading.style.display = 'none';
        verifyBtn.disabled = false;
        verifyBtn.textContent = 'Verify Code';
    }
} 
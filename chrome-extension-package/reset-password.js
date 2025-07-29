// Password Reset Script
const API_BASE_URL = 'http://44.208.217.246';

// DOM Elements
const resetForm = document.getElementById('resetForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const resetBtn = document.getElementById('resetBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const passwordStrength = document.getElementById('passwordStrength');
const passwordMatch = document.getElementById('passwordMatch');
const loading = document.getElementById('loading');

// Password requirements elements
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');

// State variables
let email = '';
let otp = '';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    // Get email and OTP from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email') || '';
    otp = urlParams.get('otp') || '';
    
    // If no data in URL, try to get from storage
    if (!email || !otp) {
        chrome.storage.local.get(['verifiedPasswordReset'], function(result) {
            if (result.verifiedPasswordReset) {
                email = result.verifiedPasswordReset.email;
                otp = result.verifiedPasswordReset.otp;
                
                // Check if the verification is still valid (within 10 minutes)
                const verificationTime = result.verifiedPasswordReset.timestamp;
                const now = Date.now();
                const tenMinutes = 10 * 60 * 1000;
                
                if (now - verificationTime > tenMinutes) {
                    showError('Verification expired. Please start the password reset process again.');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                    return;
                }
            } else {
                showError('Invalid password reset session. Please start again.');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                return;
            }
        });
    }
    
    // Auto-focus new password input
    newPasswordInput.focus();
}

function setupEventListeners() {
    // Form submission
    resetForm.addEventListener('submit', handlePasswordReset);
    
    // Password strength checking
    newPasswordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
        checkPasswordMatch();
    });
    
    // Password confirmation
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
}

function checkPasswordStrength(password) {
    const requirements = {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password)
    };
    
    // Update requirement indicators
    reqLength.classList.toggle('met', requirements.length);
    reqUppercase.classList.toggle('met', requirements.uppercase);
    reqLowercase.classList.toggle('met', requirements.lowercase);
    reqNumber.classList.toggle('met', requirements.number);
    
    // Calculate strength
    const score = Object.values(requirements).filter(Boolean).length;
    let strengthText = '';
    let strengthClass = '';
    
    if (password.length === 0) {
        strengthText = '';
    } else if (score < 2) {
        strengthText = 'Weak password';
        strengthClass = 'strength-weak';
    } else if (score < 4) {
        strengthText = 'Medium strength';
        strengthClass = 'strength-medium';
    } else {
        strengthText = 'Strong password';
        strengthClass = 'strength-strong';
    }
    
    passwordStrength.textContent = strengthText;
    passwordStrength.className = `password-strength ${strengthClass}`;
    
    return score >= 3; // Require at least 3 criteria
}

function checkPasswordMatch() {
    const password = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword.length === 0) {
        passwordMatch.textContent = '';
        passwordMatch.style.color = '';
        return true;
    }
    
    if (password === confirmPassword) {
        passwordMatch.textContent = 'Passwords match ✓';
        passwordMatch.style.color = '#28a745';
        return true;
    } else {
        passwordMatch.textContent = 'Passwords do not match ✗';
        passwordMatch.style.color = '#dc3545';
        return false;
    }
}

async function handlePasswordReset(e) {
    e.preventDefault();
    
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validation
    if (!newPassword || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (newPassword.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    if (!checkPasswordStrength(newPassword)) {
        showError('Password does not meet minimum requirements');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!email || !otp) {
        showError('Invalid reset session. Please start again.');
        return;
    }
    
    showLoading(true);
    hideMessages();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                otp: otp,
                newPassword: newPassword
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Password reset successful! Redirecting to login...');
            
            // Clear verification data
            chrome.storage.local.remove(['verifiedPasswordReset']);
            
            // Redirect to login after success
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } else {
            showError(data.message || 'Password reset failed. Please try again.');
        }
        
    } catch (error) {
        console.error('Password reset error:', error);
        showError('Network error. Please check your connection and try again.');
    } finally {
        showLoading(false);
    }
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
        resetBtn.disabled = true;
        resetBtn.textContent = 'Resetting Password...';
    } else {
        loading.style.display = 'none';
        resetBtn.disabled = false;
        resetBtn.textContent = 'Reset Password';
    }
} 
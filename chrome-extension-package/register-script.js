let passwordVisibilityTimeout;
let confirmPasswordVisibilityTimeout;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up password toggles...');
    
    // Setup for main password field
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    console.log('Password toggle:', passwordToggle);
    console.log('Password input:', passwordInput);
    
    if (passwordToggle && passwordInput) {
        console.log('Setting up password toggle listener...');
        passwordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Password toggle clicked!');
            
            // Clear any existing timeout
            if (passwordVisibilityTimeout) {
                clearTimeout(passwordVisibilityTimeout);
            }
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.querySelector('.eye-icon').textContent = '🙈';
                console.log('Password shown');
                
                // Auto-hide after 5 seconds
                passwordVisibilityTimeout = setTimeout(() => {
                    passwordInput.type = 'password';
                    passwordToggle.querySelector('.eye-icon').textContent = '👁️';
                    console.log('Password auto-hidden');
                }, 5000);
            } else {
                passwordInput.type = 'password';
                passwordToggle.querySelector('.eye-icon').textContent = '👁️';
                console.log('Password hidden');
            }
        });
    } else {
        console.error('Password toggle elements not found');
    }
    
    // Setup for confirm password field
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    console.log('Confirm password toggle:', confirmPasswordToggle);
    console.log('Confirm password input:', confirmPasswordInput);
    
    if (confirmPasswordToggle && confirmPasswordInput) {
        console.log('Setting up confirm password toggle listener...');
        confirmPasswordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Confirm password toggle clicked!');
            
            // Clear any existing timeout
            if (confirmPasswordVisibilityTimeout) {
                clearTimeout(confirmPasswordVisibilityTimeout);
            }
            
            // Toggle password visibility
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                confirmPasswordToggle.querySelector('.eye-icon').textContent = '🙈';
                console.log('Confirm password shown');
                
                // Auto-hide after 5 seconds
                confirmPasswordVisibilityTimeout = setTimeout(() => {
                    confirmPasswordInput.type = 'password';
                    confirmPasswordToggle.querySelector('.eye-icon').textContent = '👁️';
                    console.log('Confirm password auto-hidden');
                }, 5000);
            } else {
                confirmPasswordInput.type = 'password';
                confirmPasswordToggle.querySelector('.eye-icon').textContent = '👁️';
                console.log('Confirm password hidden');
            }
        });
    } else {
        console.error('Confirm password toggle elements not found');
    }
}); 
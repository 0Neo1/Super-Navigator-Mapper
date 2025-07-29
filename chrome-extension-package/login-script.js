let passwordVisibilityTimeout;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up password toggle...');
    
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
}); 
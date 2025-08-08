// Check for registration success message
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registration_success') === 'true') {
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Registration successful! Please sign in with your credentials.';
        successMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}); 
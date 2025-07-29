// Floating button test - create one if it doesn't exist
(function() {
  setTimeout(() => {
    console.log('Floatbar test: Checking for floating button...');
    
    let floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    
    if (!floatbar) {
      console.log('Floatbar test: No floating button found, creating one...');
      
      // Create a simple floating button
      floatbar = document.createElement('div');
      floatbar.className = 'catalogeu-navigation-plugin-floatbar';
      floatbar.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #007bff;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      `;
      floatbar.innerHTML = '🌳';
      floatbar.title = 'Chat Tree Navigator';
      
      // Add click handler
      floatbar.addEventListener('click', () => {
        console.log('Floatbar test: Floating button clicked!');
        alert('Floating button is working! Extension is loaded.');
      });
      
      document.body.appendChild(floatbar);
      console.log('Floatbar test: Created test floating button');
    } else {
      console.log('Floatbar test: Original floating button found');
    }
  }, 3000);
})(); 
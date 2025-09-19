// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize variables
    let clickCounter = 0;
    const colors = ['#f4f4f4', '#e8f5e8', '#fff0e6', '#f0f8ff', '#ffeef0', '#f5f5dc'];
    let currentColorIndex = 0;
    
    // Get DOM elements
    const colorBtn = document.getElementById('colorBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const counter = document.getElementById('counter');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Background color change functionality
    colorBtn.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentColorIndex];
        
        // Add a fun animation effect
        colorBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            colorBtn.style.transform = 'scale(1)';
        }, 150);
        
        console.log('Background color changed to:', colors[currentColorIndex]);
    });
    
    // Dark mode toggle functionality
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update button text based on current mode
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = 'Light Mode';
        } else {
            toggleBtn.textContent = 'Toggle Dark Mode';
        }
        
        // Reset background color when toggling modes
        if (!document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = colors[currentColorIndex];
        } else {
            document.body.style.backgroundColor = '';
        }
        
        console.log('Dark mode toggled');
    });
    
    // Counter functionality
    incrementBtn.addEventListener('click', function() {
        clickCounter++;
        counter.textContent = clickCounter;
        
        // Add visual feedback
        counter.style.transform = 'scale(1.2)';
        counter.style.color = '#e74c3c';
        
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
            counter.style.color = '#667eea';
        }, 200);
        
        // Special message for milestone clicks
        if (clickCounter === 10) {
            showTemporaryMessage('🎉 You reached 10 clicks!');
        } else if (clickCounter === 50) {
            showTemporaryMessage('🚀 Wow! 50 clicks achieved!');
        } else if (clickCounter === 100) {
            showTemporaryMessage('🏆 Century! 100 clicks completed!');
        }
        
        console.log('Counter incremented to:', clickCounter);
    });
    
    // Contact form functionality
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic form validation
        if (name.length < 2) {
            showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showFormMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form after successful submission
        contactForm.reset();
        
        console.log('Form submitted with data:', { name, email, message });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add some interactive hover effects
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Helper functions
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        }
    }
    
    function showTemporaryMessage(message) {
        // Create a temporary message element
        const tempMessage = document.createElement('div');
        tempMessage.textContent = message;
        tempMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(tempMessage);
        
        setTimeout(() => {
            document.body.removeChild(tempMessage);
        }, 2000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add CSS animation for temporary messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    // Console welcome message
    console.log('🎉 Website loaded successfully!');
    console.log('Try interacting with the buttons and form to see JavaScript in action.');
});
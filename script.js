// Add this script tag to your HTML before the closing </body> tag
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const enterButtons = document.querySelectorAll('.enter');
    const emailInput = document.getElementById('email-input');
    const emailInputOriginal = document.getElementById('email-input-original');
    const interactiveSection = document.querySelector('.interactive-section');
    const input = document.querySelector('.input');
    const inputContainer = document.querySelector('.input-container');
    const emailInputContainers = document.querySelectorAll('.email-input-container');
    
    // Set focus to the first email input when the page loads
    if (emailInput) {
        emailInput.focus();
    }
    
    // Simplified approach to hide cursor for both inputs
    function setupEmailInput(input, container) {
        if (input && container) {
            // Hide cursor when field is clicked
            input.addEventListener('click', function() {
                container.classList.add('hide-cursor');
            });
            
            // Also hide on focus (for keyboard navigation)
            input.addEventListener('focus', function() {
                container.classList.add('hide-cursor');
            });
            
            // Submit when pressing Enter key in the input field
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submitEmail(input);
                    return false;
                }
            });
        }
    }
    
    // Setup both email inputs
    if (emailInput && emailInputContainers[0]) {
        setupEmailInput(emailInput, emailInputContainers[0]);
    }
    
    if (emailInputOriginal && emailInputContainers[1]) {
        setupEmailInput(emailInputOriginal, emailInputContainers[1]);
    }
    
    // Make all ENTER text elements clickable to submit the email
    enterButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const inputToSubmit = index === 0 ? emailInput : emailInputOriginal;
            submitEmail(inputToSubmit);
        });
    });
    
    function submitEmail(inputElement) {
        const email = inputElement.value.trim();
        
        if (validateEmail(email)) {
            // Show the interactive section when a valid email is submitted
            interactiveSection.style.display = 'block';
            // You could also save the email or perform other actions here
            
            // Optional: Add content to the interactive section
            if (interactiveSection.children.length === 0) {
                interactiveSection.innerHTML = `
                    <h3>Thank you for subscribing!</h3>
                    <p>We'll keep you updated with the latest news.</p>
                `;
            }
        } else {
            alert('Please enter a valid email address');
            inputElement.focus();
        }
    }
    
    // Make the phone number clickable
    const phoneNumber = document.querySelector('.phone');
    if (phoneNumber) {
        phoneNumber.innerHTML = `<a href="tel:4152112212" style="color: white; text-decoration: none;">415-211-2212</a>`;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Hide the cursor when input is focused
    if (input) {
        input.addEventListener('focus', function() {
            inputContainer.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            inputContainer.classList.remove('input-focused');
        });
    }

    // Add event listener to phone number
    const phoneLink = document.querySelector('.phone');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Prevent default only if needed for debugging
            // e.preventDefault();
            window.location.href = this.getAttribute('href');
        });
    }
}); 
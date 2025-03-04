// Add this script tag to your HTML before the closing </body> tag
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const enterButton = document.querySelector('.enter');
    const emailInput = document.getElementById('email-input');
    const interactiveSection = document.querySelector('.interactive-section');
    const input = document.querySelector('.input');
    const inputContainer = document.querySelector('.input-container');
    const emailInputContainer = document.querySelector('.email-input-container');
    
    // Set focus to the email input when the page loads
    if (emailInput) {
        emailInput.focus();
    }
    
    // Hide cursor when input is focused
    emailInput.addEventListener('focus', function() {
        if (emailInputContainer) {
            emailInputContainer.classList.add('input-focused');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (emailInputContainer) {
            emailInputContainer.classList.remove('input-focused');
        }
    });
    
    // Make the ENTER text clickable to submit the email
    enterButton.addEventListener('click', function() {
        submitEmail();
    });
    
    // Also submit when pressing Enter key in the input field
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitEmail();
                return false;
            }
        });
    }
    
    function submitEmail() {
        const email = emailInput.value.trim();
        
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
            emailInput.focus();
        }
    }
    
    // Make the phone number clickable
    const phoneNumber = document.querySelector('.phone');
    phoneNumber.innerHTML = `<a href="tel:4152112212" style="color: white; text-decoration: none;">415-211-2212</a>`;
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Hide the cursor when input is focused
    input.addEventListener('focus', function() {
        inputContainer.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
        inputContainer.classList.remove('input-focused');
    });
    
    // Auto-resize textarea as user types
    // if (emailInput && emailInput.tagName === 'TEXTAREA') {
    //     // Function to adjust height based on content
    //     function adjustHeight() {
    //         // Reset height temporarily
    //         emailInput.style.height = 'auto';
    //         
    //         // Calculate the height based on scrollHeight
    //         const newHeight = emailInput.scrollHeight;
    //         
    //         // Apply the new height
    //         emailInput.style.height = newHeight + 'px';
    //         
    //         console.log('New height:', newHeight);
    //     }
    //     
    //     // Set initial height
    //     emailInput.style.height = '52px';
    //     
    //     // Add event listener for input
    //     emailInput.addEventListener('input', adjustHeight);
    //     
    //     // Also adjust on window resize
    //     window.addEventListener('resize', adjustHeight);
    //     
    //     // Initial adjustment
    //     setTimeout(adjustHeight, 100);
    // }

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
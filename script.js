// Add this script tag to your HTML before the closing </body> tag
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const enterButtons = document.querySelectorAll('.enter');
    const emailInputTop = document.getElementById('email-input-top');
    const emailInputBottom = document.getElementById('email-input-bottom');
    const interactiveSection = document.querySelector('.interactive-section');
    const input = document.querySelector('.input');
    const inputContainer = document.querySelector('.input-container');
    const emailInputContainers = document.querySelectorAll('.email-input-container');
    
    // Set focus to the first email input when the page loads
    if (emailInputTop) {
        emailInputTop.focus();
    }
    
    // Forcefully clear both inputs on page load to prevent autofill
    function clearInitialValues() {
        setTimeout(() => {
            // Clear both inputs to prevent autofill issues
            if (emailInputTop) emailInputTop.value = '';
            if (emailInputBottom) emailInputBottom.value = '';
        }, 100);
    }
    
    // Call immediately
    clearInitialValues();
    
    // Prevent form auto-completion from affecting both fields
    function preventSharedAutofill() {
        // Add event listeners to detect when autofill happens
        const emailFields = [emailInputTop, emailInputBottom];
        
        emailFields.forEach((field, index) => {
            if (!field) return;
            
            // When input changes (including by autofill)
            field.addEventListener('input', function(e) {
                // Only update the current field, not both
                const otherField = index === 0 ? emailInputBottom : emailInputTop;
                
                // If the change was from user typing (not autofill), do nothing special
                if (document.activeElement === field) return;
                
                // If it was an autofill event, clear the other field to prevent shared autofill
                if (otherField && otherField.value === field.value) {
                    // Only clear the other field if it's not focused
                    if (document.activeElement !== otherField) {
                        otherField.value = '';
                    }
                }
            });
            
            // Also listen for focus events to clear the other field
            field.addEventListener('focus', function(e) {
                const otherField = index === 0 ? emailInputBottom : emailInputTop;
                if (otherField && !otherField.value.trim()) {
                    // Force the browser to reset the autofill state
                    otherField.value = '';
                }
            });
        });
    }
    
    // Call the function to set up autofill prevention
    preventSharedAutofill();
    
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
                    const section = input.id === 'email-input-top' ? 'top' : 'bottom';
                    submitEmail(section);
                    return false;
                }
            });
        }
    }
    
    // Setup both email inputs
    if (emailInputTop && emailInputContainers[0]) {
        setupEmailInput(emailInputTop, emailInputContainers[0]);
    }
    
    if (emailInputBottom && emailInputContainers[1]) {
        setupEmailInput(emailInputBottom, emailInputContainers[1]);
    }
    
    // Make all ENTER text elements clickable to submit the email
    enterButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const section = index === 0 ? 'top' : 'bottom';
            submitEmail(section);
        });
    });
    
    function submitEmail(section) {
        const email = document.getElementById(`email-input-${section}`).value.trim();
        
        if (validateEmail(email)) {
            const emailSection = document.querySelector(`.email-section.${section}`);
            // Prepare the UI for loading state
            const enterButton = emailSection.querySelector('.enter');
            
            // Store original text
            const originalEnterText = enterButton.innerText;
            
            // Show loading state
            enterButton.innerText = "LOADING...";
            
            // Rate limit check
            var time = new Date();
            var timestamp = time.valueOf();
            var previousTimestamp = localStorage.getItem(`loops-form-timestamp-${section}`);

            // If last sign up was less than a minute ago, display error
            if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
                showError(emailSection, "Too many signups, please try again in a little while");
                return;
            }
            
            localStorage.setItem(`loops-form-timestamp-${section}`, timestamp);
            
            // Prepare form data
            var formBody = "userGroup=&mailingLists=&email=" + encodeURIComponent(email);
            
            // Send the request to your newsletter service
            console.log(`Submitting email: ${email}`);
            fetch("https://app.loops.so/api/newsletter-form/clx3ufqjp00cth2d6tk6rmx8c", {
                method: "POST",
                mode: 'cors',
                body: formBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => {
                console.log('Response status:', res.status);
                if (res.ok) {
                    // Success
                    showSuccess(emailSection);
                    document.getElementById(`email-input-${section}`).value = '';
                    return;
                }
                // Error with response
                return res.json().then(data => {
                    throw new Error(data.message || "Error submitting email");
                });
            })
            .catch(error => {
                // Error with request
                console.error('Fetch error:', error);
                showError(emailSection, error.message || "Oops! Something went wrong, please try again");
                
                // Reset the button text on error
                enterButton.innerText = originalEnterText;
                
                localStorage.setItem(`loops-form-timestamp-${section}`, '');
            });
        } else {
            alert('Please enter a valid email address');
            document.getElementById(`email-input-${section}`).focus();
        }
    }
    
    function showSuccess(emailSection) {
        // Hide the interactive section
        interactiveSection.style.display = 'none';
        
        // Change the SUBSCRIBE button to say THANK YOU
        const enterButton = emailSection.querySelector('.enter');
        if (enterButton) {
            enterButton.innerText = "THANK YOU";
            
            // After 5 seconds, change it back to SUBSCRIBE
            setTimeout(() => {
                enterButton.innerText = "SUBSCRIBE";
            }, 5000);
        }
    }
    
    function showError(emailSection, message) {
        // Show error message in an alert instead of scrolling
        alert(message);
        
        // Don't show the interactive section
        interactiveSection.style.display = 'none';
        
        // Change button text to "PLEASE WAIT" if it's a rate limit error
        const enterButton = emailSection.querySelector('.enter');
        if (enterButton) {
            if (message.includes("Too many signups") || message.includes("rate limit")) {
                enterButton.innerText = "PLEASE WAIT";
                
                // After 60 seconds, change it back to SUBSCRIBE
                setTimeout(() => {
                    enterButton.innerText = "SUBSCRIBE";
                }, 60000);
            } else {
                enterButton.innerText = "SUBSCRIBE";
            }
        }
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
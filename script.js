// Add this script tag to your HTML before the closing </body> tag
// <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Make the ENTER text clickable to show an email form
    const enterButton = document.querySelector('.enter');
    
    enterButton.addEventListener('click', function() {
        // Create a simple email form
        const emailForm = document.createElement('div');
        emailForm.className = 'email-form';
        emailForm.innerHTML = `
            <form>
                <input type="email" placeholder="Your email address" required>
                <button type="submit">SUBMIT</button>
            </form>
        `;
        
        // Insert the form after the email section
        const emailSection = document.querySelector('.email-section');
        emailSection.appendChild(emailForm);
        
        // Add styles for the form
        const style = document.createElement('style');
        style.textContent = `
            .email-form {
                padding: 20px;
                background-color: #5DCB5D;
            }
            .email-form input {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: none;
                font-size: 16px;
            }
            .email-form button {
                background-color: white;
                color: #5DCB5D;
                border: none;
                padding: 10px 20px;
                font-weight: bold;
                font-size: 16px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    });
    
    // Make the phone number clickable
    const phoneNumber = document.querySelector('.phone');
    phoneNumber.innerHTML = `<a href="tel:4152112212" style="color: white; text-decoration: none;">415-211-2212</a>`;
}); 
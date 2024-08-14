const validator = require('validator');

function validateEmailAddress(email) {
    return validator.isEmail(email); // Basic syntax check
    // Optionally, add domain validation here
}

// Example usage
if (!validateEmailAddress('test@example.com')) {
    console.log('Invalid email address.');
}

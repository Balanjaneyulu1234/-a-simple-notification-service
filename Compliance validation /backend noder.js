const request = require('request');

function verifyCAPTCHA(responseKey, callback) {
    const secretKey = "your_secret_key";
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`;

    request(verificationURL, function(error, response, body) {
        body = JSON.parse(body);
        callback(!body.success); // Callback with true if there was an error or CAPTCHA validation failed
    });
}

// Example usage in an express route
app.post('/submit-form', (req, res) => {
    verifyCAPTCHA(req.body['g-recaptcha-response'], error => {
        if (error) {
            return res.status(400).send({message: 'CAPTCHA validation failed'});
        }
        // Proceed with form processing
    });
});

const emailAuth = require("./email.json");

module.exports = ({ env }) => ({
    email: {
        provider: 'nodemailer',
        providerOptions: {
            host: env('SMTP_HOST', 'smtp.gmail.com'),
            port: env('SMTP_PORT', 465),
            auth: {
                type: "OAuth2",
                user: "paul@pamosystems.com",
                serviceClient: emailAuth.client_id,
                privateKey: emailAuth.private_key
            }
        },
        settings: {
            defaultFrom: 'paul@pamosystems.com',
            defaultReplyTo: 'paul@pamosystems.com',
        }
    }
});
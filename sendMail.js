const nodemailer = require('nodemailer');
const getCredentials = require('getCredentials');

const creds = getCredentials();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: creds.mailer-username,
        pass: creds.mailer-password
    }
});

const sendMail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent!");
    } catch (err) {
        console.error('Error sending email: ', err);
    }
};

module.exports = sendMail;
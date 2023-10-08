const nodemailer = require('nodemailer');
const getCredentials = require('./getCredentials');

const creds = getCredentials();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: creds.mailerUsername,
        pass: creds.mailerPassword
    }
});

const sendMail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.error('Error sending email: ', err);
        return false;
    }
};

module.exports = sendMail;
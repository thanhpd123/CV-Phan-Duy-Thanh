// filepath: /D:/React/MyResume/api/contact.js
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { promisify } = require('util');

const parseBody = promisify(bodyParser.json());

export default async function handler(req, res) {
    await parseBody(req, res);

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { name, email, subject, message } = req.body;

    const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
  `.trim();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'thanhpd2303@gmail.com',
        subject: subject,
        text: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}
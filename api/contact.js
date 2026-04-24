// Serverless function for Vercel/Netlify
// This keeps your credentials secure on the server side

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, recaptchaToken } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
        return res.status(400).json({ error: 'reCAPTCHA verification required' });
    }

    try {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
        });

        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed' });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return res.status(500).json({ error: 'reCAPTCHA verification failed' });
    }

    try {
        // Create transporter with your email settings
        const transporter = nodemailer.createTransport({
            host: 'hostingsecure.email',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER, // jp@paulhartmann.dev
                pass: process.env.EMAIL_PASSWORD // Ecuagrowers10@@
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            replyTo: email, // Allow replying to the sender
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });

    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ 
            error: 'Failed to send message. Please try again later.' 
        });
    }
}

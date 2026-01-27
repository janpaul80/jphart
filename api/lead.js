// Lead capture endpoint for chatbot contact submissions

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, source = 'chatbot' } = req.body;

    // Validate input
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'hostingsecure.email',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Lead from ${source.toUpperCase()}: ${name}`,
            html: `
                <h2>New Lead Captured</h2>
                <p><strong>Source:</strong> ${source}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            `,
            text: `
                New Lead Captured
                
                Source: ${source}
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Timestamp: ${new Date().toLocaleString()}
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            success: true, 
            message: 'Lead captured successfully!' 
        });

    } catch (error) {
        console.error('Lead capture error:', error);
        return res.status(500).json({ 
            error: 'Failed to capture lead' 
        });
    }
}

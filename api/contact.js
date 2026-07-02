const nodemailer = require('nodemailer');

const clean = (value, max) => String(value || '').trim().slice(0, max);
const escapeHtml = (value) => value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const { website } = req.body || {};
  if (website) return res.status(200).json({ success: true });

  const name = clean(req.body?.name, 120);
  const email = clean(req.body?.email, 200);
  const company = clean(req.body?.company, 160);
  const message = clean(req.body?.message, 5000);
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and project details are required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) return res.status(503).json({ error: 'The inquiry form is being configured.' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'hostingsecure.email',
      port: Number(process.env.EMAIL_PORT || 465),
      secure: String(process.env.EMAIL_SECURE || 'true') === 'true',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }
    });
    const safe = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company), message: escapeHtml(message).replace(/\n/g, '<br>') };
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New project inquiry — ${name}`,
      html: `<h2>New project inquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company || 'Not provided'}</p><p><strong>Project:</strong></p><p>${safe.message}</p>`,
      text: `New project inquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nProject:\n${message}`
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact delivery failed:', error?.message || error);
    return res.status(500).json({ error: 'The message could not be delivered right now.' });
  }
};

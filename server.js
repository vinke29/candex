const express = require('express');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-test-email', async (req, res) => {
  try {
    const { to, html } = req.body;
    
    const msg = {
      to,
      from: process.env.SENDER_EMAIL, // Your verified sender email
      subject: 'Test Email - Candex Header Template',
      html
    };
    
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}/email-header-sample.html to view the template`);
}); 
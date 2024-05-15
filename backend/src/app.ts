import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' })); // Allow all origins
// Middleware function to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// npm run dev -- --host      =>> use this command to run the server on local network
//  or just use npm run dev

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  // Validate email and message
  if (!email || !message) {
    return res.status(400).send('Email and message are required');
  }

  // Setup email data
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'THIS IS A TEST EMAIL',
    text: message
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Email sent');
    }
  });
});

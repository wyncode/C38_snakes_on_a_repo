const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const {cancellationEmail} = require('./cancellationEmail');
const {passwordEmail} = require('./forgotPassword.js');
const {welcomeEmail} = require('./welcomeEmail');
sgMail.setApiKey(SENDGRID_API_KEY);

// make sure your export function appropriatly
// make sure your importing appropriately
// call email body



const WelcomeEmail = (email, welcomeEmail) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Welcome to the Petster Exotic family ✨.',
    html: welcomeEmail
  });
};

const CancellationEmail = (email, cancellationEmail) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Sorry to see you go. 🥺',
    html: cancellationEmail
    
  });
};

const ForgotPassword = (email, token) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Reset Password.',
    html: passwordEmail(token)
    //text: `Bye ${name}. Hope to see you soon.`
  });
};

module.exports = {
  WelcomeEmail,
  CancellationEmail,
  ForgotPassword
};

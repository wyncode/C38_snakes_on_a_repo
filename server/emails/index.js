const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const sendEmail1 = require('./welcomeEmail')
const cancelEmail = require('./cancellationEmail')
const passwordEmail = require('./forgotPassword')

sgMail.setApiKey(SENDGRID_API_KEY);

// make sure your export function appropriatly
// make sure your importing appropriately
// call email body

const WelcomeEmail = (email, sendEmail1) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Welcome to the Petster Exotic family ✨.',
    // text: `
    // <div>
    // 	<h1>Welcome to Petster Exotic!</h1>
    // 	<h3>The number 1 source to find sitters for your exotic pets in your area! 😎</h3>
    // 	<button type="button">Find Pet Sitters!</button>
    // </div>`
    html: sendEmail1
  });
};

const CancellationEmail = (email, cancelEmail) => {
  sgMail.send({
    to: email,
    from: `${process.env.FROM_EMAIL}`,
    subject: 'Sorry to see you go. 🥺',
    html: cancelEmail
    //text: `Bye ${name}. Hope to see you soon.`
  });
};

const ForgotPassword = (email, passwordEmail, token) => {
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


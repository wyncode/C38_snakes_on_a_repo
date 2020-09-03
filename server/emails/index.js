const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
// const { cancellationEmail } = require('./cancellationEmail');
const { passwordEmail } = require('./forgotPassword.js');
// const { welcomeEmail } = require('./welcomeEmail');
sgMail.setApiKey(SENDGRID_API_KEY);

const WelcomeEmail = (email, welcomeEmail) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Welcome to the Petster Exotic family ✨.',
      html: welcomeEmail,
      template_id: 'd-a1f050803e924917ae14271b11d39b84'
    })
    .catch((error) => console.log(error.response.body.errors));
};

const CancellationEmail = (email, cancellationEmail) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Sorry to see you go. 🥺',
      html: cancellationEmail,
      template_id: 'd-228080a75e204bb0b14ae417ff9284ab'
    })
    .catch((error) => console.log(error.response.body.errors));
};

const ForgotPassword = (email, token) => {
  sgMail
    .send({
      to: email,
      from: `${process.env.FROM_EMAIL}`,
      subject: 'Reset Password.',
      html: passwordEmail(token)
      // html: `<a target="_blank" rel="noopener noreferrer" href="${process.env.APP_URL}/password/${token}">Reset Password</a>`,
      // template_id: 'd-aeb95daafbec49e1baee25e813252b89'
    })
    .catch((error) => console.log(error.response.body.errors));
};

module.exports = {
  WelcomeEmail,
  CancellationEmail,
  ForgotPassword
};

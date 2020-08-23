const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: `${process.env.MAILTRAP_USERNAME}`,
		pass: `${process.env.MAILTRAP_PASSWORD}`
	}
});

const welcomeMessage = {
	from: 'snakes-0fd529@inbox.mailtrap.io',
	to: 'snakes-0fd529@inbox.mailtrap.io',
	subject: 'Welcome to Pet-Xotic',
	text: 'Get the best sitters to take care of your exotics companions!'
};
transport.sendMail(welcomeMessage, (err, info) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Email sent', info);
	}
});

const cancellationMessage = {
	from: 'snakes-0fd529@inbox.mailtrap.io',
	to: 'snakes-0fd529@inbox.mailtrap.io',
	subject: 'Welcome to Pet-Xotic',
	text: 'Get the best sitters to take care of your exotics companions!'
};
transport.sendMail(cancellationMessage, (err, info) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Email sent', info);
	}
});

const forgotPassword = {
	from: 'snakes-0fd529@inbox.mailtrap.io',
	to: 'snakes-0fd529@inbox.mailtrap.io',
	subject: 'Welcome to Pet-Xotic',
	text: 'Get the best sitters to take care of your exotics companions!'
};
transport.sendMail(forgotPassword, (err, info) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Email sent', info);
	}
});

require('./db/config');
const express = require('express'),
	path = require('path'),
	openRoutes = require('./routes/open'),
	petsRoutes = require('./routes/secure/pets'),
	usersRoutes = require('./routes/secure/users'),
	cookieParser = require('cookie-parser'),
	fileUpload = require('express-fileupload');
const passport = require('./middleware/authentication');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

//Middleware
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/images'
	})
);
app.use(express.json());
app.use(cookieParser());

// Unauthenticated routes
app.use(openRoutes);

// Serve any static files
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

// Any authentication middleware and related routing would be here.
app.use(
	passport.authenticate('jwt', {
		session: false
	})
);
// Secure Route
app.use(usersRoutes);
app.use(petsRoutes);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

//Chat
io.on('connection', (socket) => {
	socket.emit('your id', socket.id);
	socket.on('send message', (body) => {
		io.emit('message', body);
	});
});

module.exports = app;

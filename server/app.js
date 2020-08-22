require('./db/config');
const express = require('express'),
  path = require('path'),
  openRoutes = require('./routes/open');

const app = express();
const usersRouter = require('./routes/secure/users');
const petsRouter = require('./routes/secure/pets');

//Middleware
app.use(express.json());

// Unauthenticated routes
app.use(openRoutes);
app.use(usersRouter);
app.use(petsRouter);

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Any authentication middleware and related routing would be here.

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
module.exports = app;

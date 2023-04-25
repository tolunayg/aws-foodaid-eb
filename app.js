require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');
const path = require('path');
const { auth, requiresAuth } = require('express-openid-connect');
const baseUrl = process.env.REACT_APP_BASE_URL

console.log(baseUrl);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: baseUrl,
  clientID: 'KGW6SDS3zMrecFa5XX3XnJjUoTIszDWu',
  issuerBaseURL: 'https://fars-metu.eu.auth0.com'
};

app.use(express.json()); // Parse JSON data from requests

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/api', requiresAuth(), router); // Mount the router middleware at the '/api' path and require authentication

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Logout route
app.get('/logout', (req, res) => {
  logout({
    returnTo: '/', // Redirect after logout
  })(req, res);
});

// Serve the index.html file for any other requests
app.get('*', requiresAuth(), (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
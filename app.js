require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./presentation/routes/router');
const path = require('path');
const openid = require('express-openid-connect');
const oauth2 = require('express-oauth2-jwt-bearer');
const baseUrl = process.env.REACT_APP_BASE_URL

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: baseUrl,
  clientID: 'KGW6SDS3zMrecFa5XX3XnJjUoTIszDWu',
  issuerBaseURL: 'https://fars-metu.eu.auth0.com'
};

const checkJwt = oauth2.auth({
  audience: 'https://fars-metu.eu.auth0.com/api/v2/',
  issuerBaseURL: `https://fars-metu.eu.auth0.com`,
});

/**
 * Postman'den atilan istekler uygulamaya dusmuyor, sanirim CORS policy ile ilgiliymis bu denemeleri yaptim, cozemedim
 */

/* 1. deneme */
// // Add the following lines to configure CORS:
// const cors = require('cors');
// const corsOptions = {
//   // origin: process.env.REACT_APP_BASE_URL, // This should be the URL of your React app
//   origin: "http://localhost:5000",
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));


/* 2. deneme */
// app.use(function (req, res, next) {
  
//   // Request methods, headers you wish to allow
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token')
  
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true)
  
//   // Pass to next layer of middleware
//   next();
// });


app.use(express.json()); // Parse JSON data from requests

app.use(openid.auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/api', checkJwt, router); // Mount the router middleware at the '/api' path and require authentication

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Logout route
app.get('/logout', (req, res) => {
  logout({
    returnTo: '/', // Redirect after logout
  })(req, res);
});

// Serve the index.html file for any other requests
app.get('*', openid.requiresAuth(), (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

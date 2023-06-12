require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./presentation/routes/router');
const path = require('path');
const openid = require('express-openid-connect');
const baseUrl = process.env.REACT_APP_BASE_URL

app.use(cors());

app.use(express.json()); // Parse JSON data from requests

// app.use('/api', checkJwt, router); // Mount the router middleware at the '/api' path and require authentication
app.use('/api', router); // Mount the router middleware at the '/api' path and require authentication

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Logout route
app.get('/logout', (req, res) => {
  logout({
    returnTo: '/', // Redirect after logout
  })(req, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

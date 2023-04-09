const express = require('express');
const app = express();
const router = require('./routes/router');
const path = require('path');

app.use(express.json()); // Parse JSON data from requests

app.use('/api', router); // Mount the router middleware at the '/api' path

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
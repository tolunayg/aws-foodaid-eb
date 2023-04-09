const express = require('express');
const app = express();
const router = require('./routes/router');
const path = require('path');

app.use(express.json()); // Parse JSON data from requests
app.use('/api', router); // Mount the router middleware at the '/api' path
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve static files
app.get('*', (req, res) => { // Handle all other routes with the React app
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT || 5000}`);
});
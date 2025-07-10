// Importing the package "path" to build the absolute paths in the application
const path = require('path');

// Importing the express package to build the node application with express framework
const express = require('express');

// Configuring the app with express.
const app = express();

// Middleware function to utilize the style from 'public' folder in the application.
app.use(express.static('public'));

// Middleware function to implement the "GET" request and display the "welcome" page.
app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'views', 'welcome.html');
    res.sendFile(filepath);
});

// Configuring the host port.
app.listen(80);
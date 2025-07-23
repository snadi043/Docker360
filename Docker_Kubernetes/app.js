const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello from this NODEJS app!!!</h1>        
        <p>Adding a new line to restart the pods in kubernetes application.</p>
        <p>Try sending a request to /error and see what happens next.</p>
    `);
});

app.get('/error', (req, res) => {
    process.exit(1);
});

app.listen(8080);
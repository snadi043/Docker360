// This section of code from lines 2-7 is basically the import section where the packages/dependencies are imported into the file.
const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // Configuring the express application.

app.use(bodyParser.urlencoded({ extended: false })); // Configuring the bodyparser in the application.

app.use(express.static('public')); // middleware function to use the directory to implement styles.
app.use('/feedback', express.static('feedback')); // middleware function to use the directory to implement storage feature.

// middleware function to implement the "GET" method and responsible to create path for the "feedback" file in the project repository.
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

// middleware function to implement the "GET" method and responsible to create path for the "exists" file in the project repository.
app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

// middleware function to implement the "POST" method and responsible to extract the data from the request body and create the paths with 
// respective folders and text files. Once, the paths are created the middleware then creates the process of reading and writing the files.
app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  await fs.writeFile(tempFilePath, content);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect('/exists');
    } else {
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect('/');
    }
  });
});

// Configuring the application to listen to the port 80. 
app.listen(80);

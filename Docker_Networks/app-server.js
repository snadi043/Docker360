// This is the entry point for the backend of the application which is developed 
// based on NODE JS framework and the dependencies are added to the package.json file of the project.

// This section has all the dependency imports used in the application.
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

// Importing the Model to use it in the database connection and communication.
const Favorite = require('./models/favorites');

// Configuring the app with express framework.
const app = express();

// Middleware to configure the body-parser package in the application.
app.use(bodyParser.json());

// Middleware to handle the "GET" request in order to fetch the favorites in the application.
app.get('/favorites', async(req, res) => {
    const favorites = await Favorite.find();
    res.status(200).json({
        favorites: favorites
    });
});

// Middleware to handle the "POST" request in order to create the favorites in the application.
app.post('/favorites', async(req, res) => {
    // The below section is responsible to parse the inputs from the request body when the API is communicating with the server.
    const favType = req.body.type;
    const favName = req.body.name;
    const favUrl = req.body.url;

    // Implementing the "try" and "catch" block to first check the type of the "favorite" selection to avoid unecessary data into the database.
    try{
        if(favType !== 'movie' && favType != 'character'){
            throw new Error('Type should be a "movie" or a "charecter"');
        }
        const existingFav = await Favorite.findOne({name: favName});
        if(existingFav){
            throw new Error('Favorite is already selected previously');
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

    // Once, filtering the requested data, adding it to the model.
    const favorite = new Favorite({
        name: favName,
        type: favType,
        url: favUrl
    });

    // Again, implementing the "try" and "catch" block to post the data to the url endpoint, if not throw error.
    try{
        await favorite.save();
        res.status(201).json({message: 'Favorite added.', favorite: favorite.toObject()});
    }
    catch(err){
        res.status(500).json({message: 'Something went wrong.'});
    }
});

// Middleware to handle the "GET" request to communicate with the thrid-party API using "axios" package.
app.get('/movies', async (req, res) => {
    try{
        const response = await axios.get('https://swapi.py4e.com/api/films');
        res.status(200).json({movies: response.data});
    }
    catch(err){
        res.status(500).json({message: 'Something went wrong'});
    }
});

// Middleware to handle the "POST" request to communicate with the thrid-party API using "axios" package.
app.get('/people', async(req, res) => {
    try {
        const response = await axios.get('https://swapi.py4e.com/api/people');
        res.status(200).json({ people: response.data });
    } 
  catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

// app.listen(3000);

// Middlware to connect with the mongo database and the node application.
mongoose.connect('mongodb://docker-mongo-app:27017/')
    .then((res) => {
        console.log("Database connected.");
    })
    .catch((err) => {
        if(err){
            console.log(err);
        }
        else{
            app.listen(3000);
        }
    });
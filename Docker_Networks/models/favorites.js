// This file represents the Model structure for the selecting the "Favorites" from the movies list in the application. 

const {Schema, model} = require('mongoose');

const favoritesSchema = new Schema({
    name: String,
    type: String,
    url: String
});

const Favorite = model('Favorite', favoritesSchema);

module.exports = Favorite;
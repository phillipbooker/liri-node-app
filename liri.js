require("dotenv").config();

// Import keys
var keys = require("./keys.js");

// Access Spotify keys
var spotify = new Spotify(keys.spotify);

// Command line arguments
var args = process.argv;
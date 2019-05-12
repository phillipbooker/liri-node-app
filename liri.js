// Configures dotenv
require("dotenv").config();

// Import keys
var keys = require("./keys.js");

// Access Spotify keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Command line arguments
var args = process.argv;

var command = args[2];
var title = args[3];

console.log("Entered command: " + command);
console.log("Entered title: " + title);


console.log("**********************");

switch(command){
    case 'concert-this':
        //Concert commands
        break;
    case 'spotify-this-song':
        if(title === undefined){
            title = 'the sign ace of base';
        }
        spotify.search({ type: 'track', query: title }, function(error, data){
            if(error){
                return console.log("Error occurred: " + error);
            }
            // If there are no results? Is an error returned?
            var track = data.tracks.items[0];
            // console.log(data.tracks.items[0]);
            // console.log(JSON.stringify(data.tracks.items[0], null, 2))

            //Track Artists
            var artistsObj = track.artists;
            var artists = [];
            artistsObj.forEach(function(artist){
                // console.log(artist.name);
                if(artist.type === "artist"){
                    artists.push(artist.name);
                }
            });
            // console.log(JSON.stringify(artistsObj, null, 2));

            var song = track.name;
            var preview = track.preview;
            var album = track.album.name;

            //Output to user
            console.log("Artists: " + artists.join(", "));
            console.log("Song Name: " + song);
            console.log("Preview Link: " + preview);
            console.log("Album: " + album);
            
        });
        break;
    case 'movie-this':
        //Concert commands
        break;
    case 'do-what-it-says':
        //Concert commands
        break;
    case 'help':
        console.log("COMMANDS:")
        console.log("concert-this <band>: Shows concert info for a given band")
        console.log("spotify-this-song <song-name>: Shows song information from Spotify")
        console.log("movie-this <movie-title>: Shows movie information for the given title")
        console.log("do-what-it-says: Executes commands in the 'random.txt' file")
        break;
    default:
        console.log("Unknown command (type 'help' for list of commands)");
}

console.log("**********************");
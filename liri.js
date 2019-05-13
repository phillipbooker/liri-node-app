// Configures dotenv
require("dotenv").config();

// Import keys
var keys = require("./keys.js");

// Access Spotify keys
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Include axios package
var axios = require("axios");

// Include moment package
var moment = require('moment');

// Include fs package (internal to node)
var fs = require("fs");

// Command line arguments
var args = process.argv;

var command = args[2];
var title = args[3];

console.log("Entered command: " + command);
console.log("Entered title: " + title);


console.log("**********************");

switch(command){
    case 'concert-this':
        concertThis(title);
        break;
    case 'spotify-this-song':
        spotifyThis(title);
        break;
    case 'movie-this':
        movieThis(title);
        break;
    case 'do-what-it-says':
        // read file
        fs.readFile('./random.txt', 'utf8', function(error, data){
            if(error){
                return console.log(error);
            }
            var textCommand = data.split(",");
            
            var fCommand = textCommand[0];
            var fTitle;
            
            if(textCommand[1] !== undefined){
                // Removes double quotes from title in text file
                fTitle = textCommand[1].replace(/["]+/g, '');
            }

            console.log("Text Command: " + fCommand);
            console.log("Text Title: " + fTitle);

            switch(fCommand){
                case 'concert-this':
                    concertThis(fTitle);
                    break;
                case 'spotify-this-song':
                    spotifyThis(fTitle);
                    break;
                case 'movie-this':
                    movieThis(fTitle);
                    break;
                case 'do-what-it-says':
                    console.log("We don't want any loops now...");
                    break;
                default:
                    console.log("Unknown command: " + fCommand);
            }
        });
        break;
    case 'help':
        console.log("COMMANDS:");
        console.log("concert-this '<band>': Shows concert info for a given band");
        console.log("spotify-this-song '<song-name>': Shows song information from Spotify");
        console.log("movie-this '<movie-title>': Shows movie information for the given title");
        console.log("do-what-it-says: Executes command in the 'random.txt' file (format: <command>,\"<title>\")");
        break;
    default:
        console.log("Unknown command (type 'help' for list of commands)");
}

function concertThis(artist){
    if(artist !== undefined){
        var query = artist.split(" ").join("+").split('.').join("");
        console.log("Query: " + query);
        axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
        .then(function(response){
            // console.log(response);
            var concerts = response.data;

            console.log("Type of concerts: " + typeof concerts);
            if(typeof concerts === "object"){
                if(concerts.length > 0){
                    console.log("Concerts ==============");
                    concerts.forEach(function(concert, i){
                        var venue = concert.venue;
                        console.log("CONCERT " + i + ":");
                        console.log("Venue: " + venue.name);
                        console.log("Location: " + venue.city + ", " + venue.region);
                        console.log("Date: " + moment(concert.datetime).format("MM/DD/YYYY"));
                        console.log("+++++");
                    });
                } else{
                    console.log("No concerts found.");
                }
                
            } else{
                console.log("Artist not found...");
            }
            
            console.log("**********************");
        });
    } else {
        console.log("Please enter an artist");
    }
}

function spotifyThis(title){
    if(title === undefined){
        title = 'the sign ace of base';
    }
    spotify.search({ type: 'track', query: title }, function(error, data){
        if(error){
            return console.log("Error occurred: " + error);
        }
        
        // console.log(data);
        if(data.tracks.items.length > 0){
            // Uses first result
            var track = data.tracks.items[0];

            // Track Artists
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
            console.log("**********************");
        } else{
            console.log("Song not found");
        }
        
    });
}

function movieThis(title){
    if(title === undefined){
        title = 'Mr. Nobody';
    }
    var query = title.split(" ").join("+").split('.').join("");
    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").
    then(function(response) {

        if(response.data.Error){
            return console.log(response.data.Error);
        } else{
            // console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);

            //Ratings
            var ratings = response.data.Ratings
            var tomatoRating = "N/A";
            if(typeof ratings === "object"){
                for(key in ratings){
                    var source = ratings[key].Source;
                    if(source === "Rotten Tomatoes"){
                        tomatoRating = ratings[key].Value;
                    }
                }
            }
            
            console.log("Rotten Tomatoes Rating: " + tomatoRating);
            
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
        console.log("**********************");
    });
}
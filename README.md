# liri-node-app

LIRI is a Language Interpretation and Recognition Interface tool (similar to Siri). Liri uses the command line to take requests from the user to perform different actions using different API calls.

Using npm packages, the user can use `npm install` in the terminal to install the necessary packages listed in the `package.json` file.

Once the necessary packages have been installed liri can be used to find information about songs using the npm Spotify package, movies using OMBD's API (using Axios), or concerts using the Bandsintown API (also using Axios).

To use the Spotify API, the user must have a `.env` file with the correct SPOTIFY_ID and SPOTIFY_SECRET variables defined so that the `dotenv` package can set the correct environment variables.

## Instructions
*(Before running)*
- Ensure your `.env` file is configured to have the SPOTIFY_ID and SPOTIFY_SECRET variables.

### Running liri
- Open the terminal
- Run `npm install` in the command line
- Once the packages have been installed, run one of the following commands: concert-this, spotify-this, movie-this, do-what-it-says
- If one of the 'this' functions are being run, use the following format: `node liri.js spotify-this 'song title'`
- If using do-what-it-says, ensure your `random.txt` file has a command in the following format: `concert-this,"Ariana Grande"`
- The output will be printed to the console.

### Technologies
JavaScript, Node.js, npm, Axios, DotEnv, moment.js

#### Notes
Required files not included in repo: .env
require("dotenv").config();

const fs = require('fs');

const moment = require('moment');

const Spotify = require('node-spotify-api');

const axios = require('axios');

let keys = require('./keys');

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let nameValue = process.argv.slice(3).join(" ");;

switch(command) {
    case "spotify-this-song":
        spotifySearch(nameValue);
        break;
    case "do-what-it-says":
        let song = fs.readFile('random.txt', "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                return data;
            }
        })
        spotifySearch(song);
        break;
    case "concert-this":
        bandsInTownSearch(nameValue);
        break;
    case "movie-this":
        movieSearch(nameValue);
        break;
    default:
        console.log('Please input a proper command');
}

function spotifySearch(song) {
    if(song == undefined) {
        song = "The Sign artist: Ace of Base";
    }
    // spotify.search({ type: 'track', query: query }).then(function(response) {
    //     console.log(response.tracks.items);
    // });
    song.replace(/\s/g, "%20");
    let query = "https://api.spotify.com/v1/search?type=track&q=" + song + '&limit=1';

    spotify.request(query).then((data) => {
        let songData = data.tracks.items[0]; 
        let url = songData.preview_url;
        if(url == null) {
            url = songData.external_urls.spotify;
        }
        console.log('Artist Name: ' + songData.artists[0].name + '\nSong Name: ' + songData.name +
        '\nPreview Link: ' + url + '\nAlbum: ' + songData.album.name);
    }).catch((err) => {
        console.error(err);
    });
}

function bandsInTownSearch(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then((response) => {
        console.log(response.data[0]);
        let eventData = response.data;
        for(i = 0; i < eventData.length; i++) {
            let venueName = eventData[i].venue.name;
            let venueLoc = eventData[i].venue.city + ', ' + eventData[i].venue.region + ', ' + eventData[i].venue.country;
            let date = moment(eventData[i].datetime).format("MM, DD, YY");

            console.log('Venue: ' + venueName + '\nVenue Location: ' + venueLoc + '\nDate: ' + date);
            console.log('\n------------------------------------\n');
        }
    }).catch((err) => {
        console.error(err);
    });
}

function movieSearch(movie) {
    if(movie === "") {
        movie = "Mr. Nobody";
    }

    let url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie.replace(/\s/g, "%20");

    function getRating(rating) {
        if(rating == undefined) {
            return "";
        } else {
            return rating[0].Value;
        }
    }

    axios.get(url).then(( response ) => {
        let movie = response.data;
        let rating = getRating(movie.Ratings);
        console.log('Movie Title: ' + movie.Title + '\nReleased: ' + movie.Released + '\nIMDB Rating: ' +
        rating + '\nCountry: ' + movie.Country + '\nLanguage: ' + movie.Language + 
        '\nPlot: ' + movie.Plot + '\nActors: ' + movie.Actors);
    }).catch((err) => {
        console.error(err);
    });
}
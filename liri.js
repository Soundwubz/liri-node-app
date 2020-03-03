require("dotenv").config();

let Spotify = require('node-spotify-api');

let keys = require('./keys');

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let nameValue = process.argv[3];

switch(command) {
    case "spotify-this-song":
        spotifySearch(nameValue);
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
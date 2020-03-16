# liri-node-app
LIRI is a *Language* Interpretation and Recognition Interface. LIRI is a command line node application.

## Running LIRI

`node liri [command]`

LIRI currently takes in 4 commands.
* `concert-this`
    * ex: `node liri concert-this Post Malone`
    * result :
    ![concert-this example](/screenshots/concert-this.png)
* `spotify-this-song`
    * ex: `node liri spotify-this-song Wow`
    * result :
    ![spotify-this-song example](/screenshots/spotify-this-song.png)
* `movie-this`
    * ex: `node liri movie-this Star Wars`
    * result : 
    ![movie-this example](/screenshots/movie-this.png)
* `do-what-it-says`
    * This command runs `spotify-this-song` for a predefined song (The Sign by Ace of Base)
    * ex: `node liri do-what-it-says`
    ![do-what-it-says example](/screenshots/do-what-it-says.png)
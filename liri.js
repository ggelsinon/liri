require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var divider = "\n------------------------------------------------------------\n\n";

var concertThis = function (artist) {
    if (!artist) {
        artist = "Garth Brooks"
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            var jSONdata = response.data;
            for (var i = 0; i < jSONdata.length; i++) {

                var tourData = [
                    "Artist: " + artist,
                    "Venue: " + jSONdata[i].venue.name,
                    "Venue location: " + jSONdata[i].venue.city + ", " + jSONdata[i].venue.region + " " + jSONdata[i].venue.country,
                    "Show Date: " + jSONdata[i].venue.name + " " + moment(jSONdata[i].datetime).format("MM/DD/YYYY"),
                    divider
                ].join("\n");

                console.log(tourData);
            }
        })

}
// concertThis("garth brooks");



var songThis = function (songName) {
    // var songData = data.tracks
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search({
        type: "track",
        query: songName,
    },
        function (error, data) {
            var songData = data.tracks
            console.log("data: " + songData.items);
            if (error) {
                return console.log('error occurred: ' + error);
            }
            var songData = data.tracks;
            for (var i = 0; i < songData.items.length; i++) {
                console.log(`Artist: ${songData.items[i].artists[0].name}\nSong Name: ${songData.items[i].name}\n Album Name: ${songData.items[i].album.name}\nPreview Link: ${songData.items[i].preview_url}\n`);
                divider;
            };
        })
    //console.log(songData.items);
    }
    // var searchResult = response.tracks.items[0];
    // var songInfo = [
    //     "Song Name: " + searchResult.name,
    //     "Artist Name: " + searchResult.artists[0].name,
    //     "Preview Link: " + searchResult.preview_url,
    //     "Album: " + searchResult.album.name,
    //     divider,
    // ];
    // console.log(songInfo);

    // songThis("take on me");

    var movieThis = function (movieName) {
        var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
        axios.get(movieURL).then(
            function (response) {
                var jSONdata = response.data;
                var movieData = [
                    "Title: " + jSONdata.Title,
                    "Year: " + jSONdata.Year,
                    "IMDB Rating: " + jSONdata.imdbRating,
                    "Rotten Tomato Rating: " + jSONdata.tomatoRating,
                    "Country Produced: " + jSONdata.Country,
                    "Plot: " + jSONdata.Plot,
                    "Actors: " + jSONdata.Actors,
                    divider,
                ].join("\n\n");


                console.log(movieData);
            }
        )
            .catch(function (err) {
                console.log(err);
            });
    }

    // movieThis("Ghost");

    var doWhatItSays = function () {
        fs.readFile("random.txt", "utf8", function (error, data) {
            var randomData = data.split(",");
            if (randomData.length === 2) {
                pick(randomData[0], randomData[1])
            } else if (randomData.length === 1) {
                pick(randomData[0])
            }
        })
    }

    var pick = function (userCase, userFunction) {
        switch (userCase) {
            case "spotify-this-song":
                songThis(userFunction);
                break;
            case "movie-this":
                movieThis(userFunction);
                break;
            case "concert-this":
                concertThis(userFunction);
                break;
        }

    }
    var runThis = function (argOne, argTwo) {
        pick(argOne, argTwo);
    };


    runThis(process.argv[2], process.argv.slice(3).join(" "));
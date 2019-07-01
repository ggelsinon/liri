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
        .catch(function (err) {
            console.log(err);
        });
}
// concertThis("garth brooks");



var songThis = function (songName) {
    if (!songName) {
        songName = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: songName,
            limit: 1,

        }),
        function (error, data) {
            if (error) {
                return console.log('error occurred: ' + error);

            } else {
                var searchResult = response.tracks.items[0];
                var songInfo = [
                    "Song Name: " + searchResult.name,
                    "Artist Name: " + searchResult.artists[0].name,
                    "Preview Link: " + searchResult.preview_url,
                    "Album: " + searchResult.album.name,
                    divider,
                ];
                console.log(songInfo);

            };
        }
            .catch(function (err) {
                console.log(err);
            });
}


// songThis("celebrate")

var movieThis = function (movieName) {
    var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(movieURL).then(
        function (response) {
            var jSONdata = response.data;
            var movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.imdbRating,
                "Rotten Tomato Rating: " + jsonData.tomatoRating,
                "Country Produced: " + jsonData.Country,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors,
                divider,
            ].join("\n\n");

            console.log(jSONdata);
            console.log(movieData);
        }
    )
        .catch(function (err) {
            console.log(err);
        });
}

movieThis("Ghost");

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
require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var dotenv = require("DotEnv");

var concertThis = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
axios.get(queryURL).then(
    function(response){
        var jSONdata = response.data;
        console.log(jSONdata);
    }

)
}
// concertThis("garth brooks");

var songThis = function (songName) {
    spotify.search(
        {
            type: "track",
            query: songName

        },
        function(error, data){
            console.log(data.tracks)
        }
    )
}
// songThis("celebrate")

var movieThis = function (movieName) {
    var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
axios.get(movieURL).then(
    function(response){
        var jSONdata = response.data;
        console.log(jSONdata);
    }

)
}
// movieThis("Ghost");

var doWhatItSays = function () {
fs.readFile("random.txt", "utf8", function(error, data){
    var randomData = data.split(",");
    if (randomData.length === 2) {
        pick(randomData[0],randomData[1])
    } else if (randomData.length === 1) {
        pick(randomData[0])
    }
})
}

var pick = function(userCase, userFunction){
    switch(userCase){
    case "spotify-this-song":
        songThis(userFunction);
        break;
    case "movie-this":
        movieThis(userFunction);
    case "concert-this":
        concertThis(userFunction);
    }

}
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
  };
  
  
  runThis(process.argv[2], process.argv.slice(3).join(" "));
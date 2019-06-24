require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

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

var artistThis = function (songName) {
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
// artistThis("celebrate")

var movieThis = function (movieName) {
    var movieURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
axios.get(movieURL).then(
    function(response){
        var jSONdata = response.data;
        console.log(jSONdata);
    }

)
}
movieThis("Ghost");
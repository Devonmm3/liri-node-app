require("dotenv").config();

var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var action = process.argv[2];
var parameter = process.argv[3];

function switchCase() {

    switch (action) {

        case "concert-this":
            bandsInArea(parameter);
            break;

        case "spotify-this-song":
            spotifySong(parameter);
            break;

        case "movie-this":
            movieInformation(parameter);
            break;

        case "do-what-it-says":
            getRandomRequest();
            break;

        default:
            logInfo("Invalid Instruction");
            break;

    }
};

function bandsInArea(parameter) {
    if (action === "concert-this") {
        var movi
    }
}


// var filename = ".log.txt";
// var log = require("simple-node-logger").createFileLog(filename);

// log.setLevel('all');
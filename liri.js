require("dotenv").config();

var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
moment().format();

var command = process.argv[2];
var input = process.argv[3];

function bandsInArea(bandQuery) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    bandQuery +
    "/events?app_id=codingbootcamp#";

  console.log(queryURL);
  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var concertData = JSON.parse(body);

      var concertDateTime = concertData[0].datetime;
      var momentDateTime = moment().format("L");

      console.log("------------------------------");

      console.log(
        "Venue Name : " +
          concertData[0].venue.name +
          "\nVenue Location: " +
          concertData[0].venue.city +
          "," +
          concertData[0].venue.country +
          "\nDate of the Event: " +
          momentDateTime +
          "\n--------------------------"
      );
    }
  });
}

function findMovie(movieQUery) {
  if (movieQUery === undefined || null) {
    movieQUery = "Mr.Nobody";
  }
  var queryURL =
    "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

  console.log(queryURL);

  request(queryURL, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      console.log("----------------------------------");
      console.log(
        "Movie Title: " +
          movieData.Title +
          "\nYear: " +
          movieData.released +
          "\nIMDB Rating: " +
          movieData.imdb.Rating +
          "\n Rotten Tomatoes Rating: " +
          movieData.Ratings[1].Value +
          "\nCountry: " +
          movieData.Country +
          "\nLanguage: " +
          movieData.Language +
          "\nPlot: " +
          +movieData.Plot +
          "\nActors: " +
          movieData.Actors +
          "\n-----------------------------------"
      );
    }
  });
}
findMovie();

var askIt = function(commands, otherData) {
  switch (commands) {
    case "concert-this":
      bandsInArea(otherData);
      break;
    case "movie-this":
      findMovie(otherData);
      break;
    case "spotify-this":
      spotifySong(otherData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Invalid. Please try again");
  }
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) throw error;
    var randomText = data.split(",");

    if (randomText.length == 2) {
      askIt(randomText[0], randomText[1]);
    } else if (randomText.length == 1) {
      askIt(randomText[0]);
    }
  });
};

askIt(command, input);

function spotifySong(parameter) {
  var searchForTrack;
  if (parameter === undefined) {
    searchForTrack = "The Sign by Ace of Base";
  } else {
    searchForTrack = parameter;
  }
  spotify.search(
    {
      type: "track",
      query: searchForTrack
    },
    function(error, data) {
      if (error) {
        console.log("Error occured: " + error);
        return;
      } else {
        for (i = 0; i < data.tracks.items.length && i < 5; i++) {}
        Log("\n-------------------------------------\n");
        Log("Artist: " + data.tracks.items[0].artists[0].name);
        Log("Song" + data.tracks.items[0].name);
        Log("Preview: " + data.tracks.items[3].preview_url);
        Log("Album: " + data.tracks.items[0].album.name);
        Log("\n--------------------------------------\n");
      }
    }
  );
}

// var filename = ".log.txt";
// var log = require("simple-node-logger").createFileLog(filename);

// log.setLevel('all');

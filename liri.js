require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
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
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var concertData = JSON.parse(body);

      var concertDateTime = concertData[0].datetime
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

  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
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

var askIt = function (commands, otherData) {
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

var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
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

function spotifySong(songSearch) {

  if (songSearch === undefined || null) {
    songSearch = "The Sign by Ace of Base";
  }
  spotify.search({
      type: "track",
      query: songSearch
    },
    function (error, data) {
      if (error) {
        return console.log("Error occured: " + error);

      } else {
        for (i = 0; i < data.tracks.items.length && i < 5; i++) {
          var musQuery = data.tracks.items[i];
          console.log("Artist: " + musQuery.artists[0].name + "\nSong Name: " + musQuery.name + "\nLink to Song: " + musQuery.preview_url + "\nAlbum Name: " + musQuery.album.name + "\n----------------------------------");


        }
      }
    })
}
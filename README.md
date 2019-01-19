# liri-node-app
This App uses node in the command line so that the user can spotify songs, find concerts that are in town, and find info about movies.  

# Technologies I used:
node.js and Javascript. Also used the npm install for axios, moment and DotEnv.

# APIS used:

Spotify API, OMDB API, and Bands in Town API

# Directions on How to Use:

For this program you need to run node.  When you have navigated to the file, run "node liri.js" and then one of the following commands depending on what info you are looking for.

movie-this <movie name here>
spotify-this <song name here>
concert-this <band name here>
do-what-it-says.

# movie-this:

This command will bring info from the OMDB API, and will display the movie's title, release year, IMDB rating, rotten tomatoes rating,country where it was filmed, the language, and the actors.  The default if no movie title is including and you simply write "movie-this" will be Mr. Nobody.

# spotify-this:

This command will bring the information for the song the user inputs.  The info includes the artist, song name, a link to spotify, and the album.  If there are more than one song with the name you type, it will return all of the results.  If you don't type a song it will default to "I saw the Sign" by Ace of Base.

# concert-this:

This command shows the information about where a musician or band is.  It will show the date of the concert, the name of the venue and the venue's location.  It shows the concerts closest to the time of the request. For example, on 1/18/19, I typed in "Citizen Cope" and it returned to me that he is playing tonight in Philadelphia.




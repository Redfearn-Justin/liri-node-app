//requires

require("dotenv").config();

var request = require("request");

var Spotify = require("node-spotify-api");

var Twitter = require("twitter");

var keys = require("./keys.js");

var fs = require("fs");


// variables

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var command = process.argv[2];

var name = process.argv[3];


// IF / ELSE STATEMENTS


if (command === "my-tweets") {

    console.log("\nHold on one second..looking for your tweets now..\n");

    myTweets();
}


else if (command === "spotify-this-song") {

    console.log("\nHold on one second..looking for your song now..\n");

    spotifyThisSong(name);

}

else if (command === "movie-this") {

    console.log("\nHold on one second..looking for your movie now..\n");

    movieThis(name);
}

else if (command === "do-what-it-says") {

    console.log("\nOh okay, you like to live on the edge.. Well I have just the thing for you :)\n");

    doWhatItSays();
}



//functions

function myTweets() {

    var params = {screen_name: '__FoxMcCloud_'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {

            console.log("Found your tweets!" + "\n\n");

            var tweetArray = JSON.parse(response.body);

            for (var i = 0; i < tweetArray.length; i++) {

                var tweetArray2 = tweetArray[i];

                console.log("\n\n" + tweetArray2.created_at + "\n" + tweetArray2.text + "\n\n");


            }
        }

        else {

            console.log("Error occured" + error);

        }
    });

}

function spotifyThisSong(song_name) {

    if(song_name == null) {

        console.log("Whoops, looks like nothing was entered!\n\nNo fear, liri is here (with a recommendation)!");

        song_name = "The Sign Ace Of Base"
    }

    spotify.search({ type: 'track', query: song_name }, function(err, data) {

        if (err) {

            console.log("Error occurred: " + err + "\n");

        }

        else {

            console.log("\nGot it!");

            var songInfo = data.tracks.items[0];
            
            console.log("Artist: " + songInfo.artists[0].name + "\n");
            console.log("Song: " + "'" + songInfo.name + "'" + "\n");
            console.log("Album: " + songInfo.album.name + "\n");
            console.log("Preview URL: " + songInfo.external_urls.spotify + "\n");
  
        }

    });

}

function movieThis(movie_name) {

    if(movie_name == null) {

        console.log("Woah, are you trying to trick me with that blank response?");
        console.log("\n\nRegardless, I've got just the movie for this occassion..");

        movie_name = "The Last Of The Mohicans";



    }

    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response) {

        if (!error && response.statusCode === 200) {

            console.log("\n...and here's your movie!\n\n")
    
            console.log("Title: " + JSON.parse(response.body).Title + "\n");
            console.log("Year Released: " + JSON.parse(response.body).Year + "\n");
            console.log("IMDB Rating: " + JSON.parse(response.body).imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(response.body).Ratings[1].Value + "\n");
            console.log("Made In: " + JSON.parse(response.body).Country + "\n");
            console.log("Avaiable Languages: " + JSON.parse(response.body).Language + "\n");
            console.log("Synopsis: " + JSON.parse(response.body).Plot + "\n");
            console.log("Actors: " + JSON.parse(response.body).Actors + "\n");

        }

        else {

            console.log("Error: " + error);
            
        }

    });

}

function doWhatItSays() {
        
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {

            return console.log(error)
        }
        
        var dataRead = data.split(",");   

        spotifyThisSong(dataRead[1]);

    });   

}
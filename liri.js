
var nodeArgs = process.argv;
var command = nodeArgs[2];


switch(command) {
    case "my-tweets": 
        twitter();
        break;
                        
    case "spotify-this-song":  
        spotify();
        break;

    case "movie-this":
        IMDB();
        break;
    case "do-what-it-says":
        readFile();
        break;
}

function twitter() {

    var Twitter = require('twitter');
    var user = nodeArgs[3];
    
    var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET 
    });
    
    var params = {

        screen_name: user, 
        count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        //contains tweet number value;
        var counter = 1;

        if (error) {
            console.log(error);
            return;
        }

        console.log("\n***************************************************");
        console.log("***************************************************");
        console.log("***************** TWITTER RESULTS *****************");
        console.log("***************************************************");
        console.log("***************************************************");
        
		for (var i = 0; i < tweets.length; i++) {
			console.log("\nTweet Number: " + counter++);
			console.log("__________________\n");
			console.log("@" + tweets[i].user.screen_name + "\n");
			console.log(tweets[i].text);
            console.log("\n***************************************************\n");
		}

    });

}

function spotify() {

    var title = "";

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    if(nodeArgs[3]) {
        //if parameter is given store it in title
        title = nodeArgs[3];
        // Capture all the words in the title (again ignoring the first three Node arguments)
        for (var i = 3; i < nodeArgs.length; i++) {
            
            // Build a string with the title.
            title = title + " " + nodeArgs[i];   
        }
            
        spotify.search({ type: 'track', query: title }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

        console.log("\n***************************************************");
        console.log("***************************************************");
        console.log("***************** SPOTIFY RESULTS *****************");
        console.log("***************************************************");
        console.log("***************************************************");
        console.log("\n* Song: " + data.tracks.items[0].name);
        console.log("* Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("* Album: " + data.tracks.items[0].album.name);
        console.log("* URL: " + data.tracks.items[0].href);  
        console.log("\n***************************************************\n");
        });
    }
    else {
        
       spotify
         .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
         .then(function(data) {
           console.log("\n***************************************************");
            console.log("***************************************************");
            console.log("***************** SPOTIFY RESULTS *****************");
            console.log("***************************************************");
            console.log("***************************************************");

            console.log("\n* Song: " + data.name);
            console.log("* Album: " + data.album.name); 
            console.log("* Artist: " + data.artists[0].name); 
            console.log("* URL: " + data.href); 

            console.log("\n***************************************************\n"); 
         })
         .catch(function(err) {
           console.error('Error occurred: ' + err); 
         });
    }

}


function IMDB() {
    
    var request = require("request");
    

    var movieName = "Mr. Nobody";

    if(nodeArgs[3]) {

        movieName = nodeArgs[3];

    }
    
    
    // Grab or assemble the movie name and store it in a variable called "movieName"
    for(var i = 3; i < process.argv.length; i++) {
    
        if(i > 3 && i < process.argv.length) {
            //adds an addition sign because thats how imdb wants multiple word movies formatted (i.e. "Die+Hard")
            movieName += "+" + process.argv[i];
        }
        else {
            movieName = process.argv[i];
        }
    
    }
    
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    
    // Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
        if(!error && response.statusCode === 200) {

            
            console.log("\n***************************************************");
            console.log("***************************************************");
            console.log("****************** OMDB RESULTS *******************");
            console.log("***************************************************");
            console.log("***************************************************");
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("\n***************************************************\n");
        }

    });
}

function readFile() {

    
    
}

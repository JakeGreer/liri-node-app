
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
    
    console.log(client);
    
    var params = {

        screen_name: user, 
        count: 10
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        var counter = 1;

        if (error) {
			return console.log(error);
        }
        
		for (var i = tweets.length - 1; i >= 0; i--) {
			console.log("\nTweet Number: " + counter++);
			console.log("==================================================");
			console.log("@" + tweets[i].user.screen_name);
			console.log(tweets[i].text);
			console.log("==================================================");
			console.log(" ");
		}

    });

}

function spotify() {

    var title = nodeArgs[3];

    // Capture all the words in the address (again ignoring the first two Node arguments)
    for (var i = 3; i < nodeArgs.length; i++) {
        
        // Build a string with the title.
        title = title + " " + nodeArgs[i];
        
    }

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
        
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }

    console.log("\n***************************************************");
    console.log("***************************************************");
    console.log("***************** SPOTIFY RESULTS *****************");
    console.log("***************************************************");
    console.log("***************************************************");

    for(var i = 0; i < 5; i++) {

        console.log("\n* Song: " + data.tracks.items[i].name);
        console.log("\n* Artist: " + data.tracks.items[i].artists[0].name); 
        console.log("\n*URL: " + data.tracks.items[i].href); 
        // console.log("\n* Artist: " + data.tracks.items[i].artists.name); 

        console.log("***************************************************");
    }  
    });
}


function IMDB() {
    
    var request = require("request");
    
    var movieName = nodeArgs[3];
    
    
    // Grab or assemble the movie name and store it in a variable called "movieName"
    for(var i = 3; i < process.argv.length; i++) {
    
        if(i > 3 && i < process.argv.length) {
    
            movieName += "+" + process.argv[i];
        }
        else {
            movieName = process.argv[i];
        }
    
    }
    // ...
    
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    
    // Then create a request to the queryUrl
    // ...
    request(queryUrl, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            console.log("_______________________________________________________________");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).Rated);
            console.log("_______________________________________________________________");
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Director: " + JSON.parse(body).Director);
            console.log("Writer: " + JSON.parse(body).Writer);
            console.log("_______________________________________________________________");
            console.log("_______________________________________________________________");
        }
    });
}

function readFile() {
    
}
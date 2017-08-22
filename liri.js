
var nodeArgs = process.argv;
//stores command that feeds into liri function..decides which node package to pull from
var command = nodeArgs[2];
//core node package for reading and writing files
var fs= require("fs");


function liri(command) {

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
}

//Pulls the latest 20 tweets from the users twitter account.. if no user is given as an argument it defualts to the client of the keys.
function twitter() {

    var Twitter = require('twitter');
    var user = nodeArgs[3];
    //client keys for jakegreer93
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

        //logs error if there is one and terminates the program
        if (error) {
            console.log(error);
            return;
        }

        //logs the latest command and user into the log.txt file.
        fs.appendFile("log.txt", ',my-tweets,' + tweets[0].user.screen_name, function(err) {
            //if the code experiences any errors it will lof the error and return it to terminate the program. 
            if(err){
                return console.log(err);
            } 
            //lets user know there was no errors and the file has been updated.         
            console.log("log.txt was updated");
            
        });

        //Formatting
        console.log("\n***************************************************");
        console.log("***************************************************");
        console.log("***************** TWITTER RESULTS *****************");
        console.log("***************************************************");
        console.log("***************************************************");
        
        //loops through latest 20 tweets
		for (var i = 0; i < tweets.length; i++) {
			console.log("\nTweet Number: " + counter++);
			console.log("__________________\n");
			console.log("@" + tweets[i].user.screen_name + "\n");
			console.log(tweets[i].text);
            console.log("\n***************************************************\n");
		}

    });

}

//This function takes in a song name as a parameter and makes a request to the node-spotify-api and displays data from the song.
function spotify() {

    var title = "";

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    //This block of code will only run if a song is given as a parameter...else the results will defualt to something else.
    if(nodeArgs[3]) {
        //if parameter is given store it in title
        title = nodeArgs[3];
        // Capture all the words in the title (again ignoring the first three Node arguments)
        for (var i = 4; i < nodeArgs.length; i++) {
            
            // Build a string with the title.
            title = title + " " + nodeArgs[i];   
        }
            
        spotify.search({ type: 'track', query: title }, function(err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //Appends the liri command and the song name to log.txt file
            fs.appendFile("log.txt", ',spotify-this-song,' + title, function(err) {
            //if the code experiences any errors it will lof the error and return it to terminate the program. 
            if(err){
                return console.log(err);
            }
        
            console.log("log.txt was updated");
        
            });

            //Formatting
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
    //Else statement used if no song name is given...Defualts the results to The Sign by Ace of Base.
    else {
        //Appends the liri command and the defualt song name to the file.
        fs.appendFile("log.txt", ',spotify-this-song, The Sign', function(err) {
            //if the code experiences any errors it will lof the error and return it to terminate the program. 
            if(err){
                return console.log(err);
            }
            console.log("log.txt was updated"); 
        }); 
       spotify
         //makes a request to the track id of 'The Sign'.
         .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
         .then(function(data) {
           //Formatting
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
         //Catches and displays an error if there is one.
         .catch(function(err) {
           console.error('Error occurred: ' + err); 
           return;
         });
    }

}

//This function takes in a movie title and returns information about the movie.
function IMDB() {
    
    var request = require("request");

    //set default movie name to 'Mr. Nodbody'.
    var movieName = "Mr. Nobody";
    //If a movie name is given overwrite the defulat name.
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
            var fileName = process.argv[2];
            
            
            fs.appendFile("log.txt", ',movie-this,' + movieName, function(err) {
                //if the code experiences any errors it will lof the error and return it to terminate the program. 
                if(err){
                    return console.log(err);
                }
            
                console.log("log.txt was updated");
            
            });

            //Formatting
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

//This function takes a file name and reads the latest command and parameter and inserts it into the liri function.
function readFile() {

    var fileName = "";

    //if a file name is given then store it in the fileName variable.
    if(nodeArgs[3]) {
        fileName = nodeArgs[3];
    }
    //if no file name is given then default the file name to 'random.txt'.
    else {
        fileName = "random.txt";
    }

    fs.readFile(fileName, "utf8", function(err, data) {
        //if the code experiences any errors it will lof the error and return it to terminate the program. 
        if(err){
            console.log(err);
            return;
        }
        //let user know that file name can be inserted.
        if(fileName != "log.txt") {
            console.log("\nInsert log.txt as the file name after 'do-what-it-says' to have the program run your latest commands out of that file.");
        }
        //stores each piece of data between commas in a different index of the array.
        var dataArr = data.split(",");
        //this sets the parameter to the last argument in the file...
        //note: if format is not sustained within the text files (i.e. "COMMAND","PARAMETER","COMMAND","PARAMETER")then this function will break.
        nodeArgs[3] = dataArr[(dataArr.length - 1)];
        //this sets the command to the last used command in the file...
        //again..this will break if format is not sustained.
        liri(dataArr[(dataArr.length - 2)]);
    });
    
}
//Calls the liri function.
liri(command);

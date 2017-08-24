# liri-node-app
-----------------------
 Command Line Arguments 
-----------------------

All commands should begin with the call "node liri.js" to call the file..

Examples: my-tweets
          my-tweets desired_screen_name
          spotify-this-song desired_song_name
          movie-this desired_movie_name
          do-what-it-says
          do-what-it-says file_name
          clear-log

full working example: (node liri.js spotify-this-song "Yellow Submarine");


The commands are designed to be given with an argument and give data back depending on the command. 


______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________


The my-tweets command can be called by itself which will defualt to the user assigned to the client keys being used or it can take in a user as a parameter. The program will return the 20 latest tweets from the user and log them to the terminal.

Sample response:

***************************************************
***************************************************
***************** TWITTER RESULTS *****************
***************************************************
***************************************************

Tweet Number: 1
__________________

@jakegreer93

99 little bugs in the code
99 little bugs in the code
Take one down, patch it around
125 little bugs in the code

***************************************************


Tweet Number: 2
__________________

@jakegreer93

There are only 10 kinds of people in this world: those who know binary and those who don’t.

***************************************************


Tweet Number: 3
__________________

@jakegreer93

hellooo

***************************************************

log.txt was updated

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

The spotify-this-song command can be called by itself or with a song as a parameter. The function will defualt to the song "The Sign" by Ace of Base and return the results on that song to the terminal. If the user inputs a song name after the command the results will display for that song.

sample response: 

***************************************************
***************************************************
***************** SPOTIFY RESULTS *****************
***************************************************
***************************************************

* Song: Yellow Submarine - Remastered
* Artist: The Beatles
* Album: Revolver (Remastered)
* URL: https://api.spotify.com/v1/tracks/50xwQXPtfNZFKFeZ0XePWc

***************************************************

log.txt was updated

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

The movie-this command can be called by itself or with a movie as a parameter. The function will defualt to the song "Mr. Nobody" and return the results on that movie to the terminal. If the user inputs a movie name after the command the results will display for that song.

Sample Response: 

***************************************************
***************************************************
****************** OMDB RESULTS *******************
***************************************************
***************************************************

* Title: Mr. Nobody
* Release Year: 2009
* Rated: R
* IMDB Rating: 7.9
* Rotten Tomatoes Rating: 64%
* Plot: A boy stands on a station platform as a
        train is about to leave. Should he go
        with his mother or stay with his father?
        Infinite possibilities arise from this
        decision. As long as he doesn't choose,
        anything is possible.
* Actors: Jared Leto, Sarah Polley, Diane Kruger,
        Linh Dan Pham

***************************************************


______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

______________________________________________________________________________________________________________________________________________________________

THe do-what-it-says function is a function specific to text files within the folder of liri. This function defaults to the file random.txt but also accepts the file log.txt. the format in random.txt and log.txt MUST remain consistent or the code will break if given these commands. The files must contain the following format...

LIRI-COMMAND,PARAMETER,LIRI-COMMAND,PARAMETER (** NOTE: the first command does not start with a comma but every following command does **)

The random.txt is not updated within the program only the file log.txt is updated. Every time a command is run the program will add the command and argument to the log. If the log is empty the program will be sure to not append a comma in the beginning(which indicates an empty array index and breaks the code) if commands are already populating the file then the program will add the commas for formatting. random.txt does not change that file must be manually written(for testing purposes). Also not that each new command drops to a new line within the log.txt to appease the eye better. Before the log was running one continuous line out and it was very messy.

Sample log.txt: 
_____________________________________

spotify-this-song,blister in the sun
,movie-this,harry+potter
,my-tweets,jakegreer93
_____________________________________


random.txt:
_____________________________________

spotify-this-song,"I Want it That Way"
_____________________________________


The clear-log command does exactly what it says..It clears any commands appended to the log.txt file. This function works by first using npm inquirer to confirm with the user that they want to clear the log. Then the function grabs the log.txt file and rewrites a blank string to the file. The file will be completely empty and ready for more commands.
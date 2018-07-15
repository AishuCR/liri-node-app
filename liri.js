//add code to read and set any environment variables with the dotenv package:
const dotenv = require("dotenv").config();
const fs = require('fs');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const Twitter = require('twitter');
const request = require('request');

const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

const userInput = process.argv[2];
const input = process.argv.slice(3).join('');
// //var to hold the users choice 
// var songChoice = "";
// var omdbRequest = "";
switch(userInput){
    case "my-tweets":
    twitterCall();
    break;
case "spotify-this-song":if(input){
    searchSong(input)
}
else{
searchSong("The Sign")
}
break;
case "movie-this":
if(input){
    searchMovie(input)
}
else{
    searchMovie("Mr. Nobody")
}
break;
case "do-what-it-says":
doIt();
break;
default: 
console.log("Enter either my-tweets or spotify-this-song or movie-this.")
break;  
}
function twitterCall(){
    const twitterName = {twitter_name: '@Aishu36601832'};
  client.get('statuses/user_timeline', twitterName, function(error, tweets, response){
    if(!error){
      for(var i = 0; i<tweets.length; i++){
        const date = tweets[i].created_at;
        console.log("@Aishu36601832: " + tweets[i].text + " Created At: " + date.substring(0, 19));
      }
    }else{console.log('Error occurred');
    }
  });
}
function searchSong(input){
    spotify.search({ type: 'track', query: input}, function(error, data){
        if(!error){
          for(var i = 0; i < data.tracks.items.length; i++){
            const songData = data.tracks.items[i];
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song: " + songData.name);
            console.log("Preview URL: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
          }
        } else{console.log('Error occurred.');
        }
      });
    }
    function searchMovie(input){
      const URL = 'http://www.omdbapi.com/?t='+input+'&apikey=dcf3026c';
      request(URL, function (error, response, data){
        if(!error && response.statusCode == 200){
          var data = JSON.parse(data);
          // console.log(data)
          console.log("Title: " + data.Title);
          console.log("Release Year: " + data.Year);
          console.log("IMdB Rating: " + data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + data.tomatoRating);
          console.log("Country: " + data.Country);
          console.log("Language: " + data.Language);
          console.log("Plot: " + data.Plot);
          console.log("Actors: " + data.Actors);
    }
     else{console.log('Error occurred.')}
        if(input === "Mr. Nobody"){
          console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
          console.log("It's on Netflix!");
        }
      });
    }
    
    function doIt(){fs.readFile("./random.txt","utf8", function(error,data){
        if (error) {
                console.log(error);
            } else {
        // console.log(data);
       var txt = data.split(',');
        // console.log(txt);
        searchSong(txt[1]);
        }
    });
    }
// function Spotify(Artist, Song_name, Link, Album){
//     this.Artist = Artist;
//     this.Song_name = Song_name;
//     this.Link = Link,
//     this.Album = Album;
// }
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
// //array to contain all tweets 
// var tweetsarr = [];
// //array to contain all the spotify songs
// var spotifyarr = [];
// //accessing key.js file
// var keylink = require("./keys");
// console.log(keylink);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require("express");
var app = express();
const port = process.env.PORT || 1337;

var pt = require("./lib/plattentests");
var spotify = require("./lib/spotify");

app.use(express.static(__dirname + "/public"));
// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


// API 
app.get("/rezis", async (req, res) => {
  if (!req.query.date) {res.json("no date given"); return;}
  const date = req.query.date

  console.log(`Query rezis (date: ${date})`)
  var reziIds = await pt.getRezisForDate(date);
  res.json(reziIds); 
 
});

app.get("/rezidetails/:id", async (req, res) => {
  var reziDetails = await pt.getReziDetails(req.params.id);
  var spotifyInfos = await spotify.getSpotifyInfos(reziDetails.title, spotifytoken);
  if (spotifyInfos && spotifyInfos.albums && spotifyInfos.albums.items.length > 0) {
    reziDetails.spotifyInfos = spotifyInfos;
    reziDetails.albumcover = spotifyInfos.albums.items[0].images[0].url
    reziDetails.spotifyid = spotifyInfos.albums.items[0].id
  } 
  res.json(reziDetails);
 
})

// SPOTIFY
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
var spotifytoken;
spotify.getAuthToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET).then((result) => {
  spotifytoken = result
}).catch(error => {throw error})

// Server
console.log("process.env.port: " + process.env.PORT)
app.listen(port, () => {
  console.log(`Server listening at port '${port}'`);
});

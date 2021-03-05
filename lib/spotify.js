var request = require("request"); // "Request" library

exports.getAuthToken = async function (client_id, client_secret) {
  if (!client_id || !client_secret) {
    throw "Spotify CLIENT_ID and CLIENT_SECRET missing!";
  }

  return new Promise((resolve, reject) => {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        console.log("Acquired spotify API token");
        var token = body.access_token;
        resolve(token);
      } else {
        throw "Error at acquiring spotify token:" + JSON.stringify(body);
      }
    });
  });
};
 
const spotifyCache = [];
exports.getSpotifyInfos = async (title, spotifytoken) => {
  var title = title.replace("& ", "").replace("&", "").replace(" - ", " ");

  return new Promise((resolve, reject) => {
    if (spotifyCache[title]) {
      console.log("Using spotify cache for " + title);
      resolve(spotifyCache[title]);
      return;
    }

    console.log("Querying spotify for " + title);

    var options = {
      url: "https://api.spotify.com/v1/search?type=album&q=" + encodeURIComponent(title),
      headers: {
        Authorization: "Bearer " + spotifytoken,
      },
      json: true,
    };

    request.get(options, function (error, response, body) {
      if (error) {
        reject();
      }
      spotifyCache[title] = response.body;
      resolve(response.body);
    });
  });
};

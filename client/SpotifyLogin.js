import React, { useState, useContext } from "react";
import SpotifyContext from "./SpotifyContext";
import { getHashParams } from "./ReziContainer";
import SpotifyWebApi from "spotify-web-api-js";

export function SpotifyLogin(props) {
  const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);
  const [ user, setUser ] = useState(undefined);
  
  console.log("Rerender SpotifyLogin")

  var hash = getHashParams();
  if (!spotifyInfo.accessToken && hash.access_token) {
    window.location.hash = "";
    spotifyInfo.accessToken = hash.access_token;
    console.log("Set access token to context")
    setSpotifyInfo(spotifyInfo);
  }

  // Login
  const login = () => {
    console.log("Login");
    const CLIENT_ID = "cfb7e3670ce0436999ed4a498efb52c7"; // Your client id

    // const REDIRECT_URI = $location.absUrl().split('?')[0].replace("index.html", "") + "index.html"
    const REDIRECT_URI = window.location.origin + "/index.html";
    const scopes = "streaming, user-read-email, user-read-private, user-read-playback-state, user-modify-playback-state, user-library-read, user-library-modify";
    const authUrl =
      "https://accounts.spotify.com/authorize" +
      `?client_id=${encodeURIComponent(CLIENT_ID)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  if (!spotifyInfo.accessToken) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  if (spotifyInfo.accessToken) {
    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(spotifyInfo.accessToken);

    if (!user) {
      spotify.getMe().then((retrievedUser) => {
        setUser(retrievedUser);
      });
      return <div>Loading user info...</div>;
    }

    if (user) {
      return <div>Logged In: {user.display_name}</div>;
    }
  }
}

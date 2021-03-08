import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { getHashParams } from './ReziContainer';

export function SpotifyLogin(props) {

  const [spotifyAccessToken, setSpotifyAccessToken] = useState(false);
  const { spotifytoken, setSpotifytoken } = useContext(AuthContext);

  var hash = getHashParams();
  if (!spotifyAccessToken && hash.access_token) {
    setSpotifyAccessToken(hash.access_token);
    window.location.hash = '';
    setSpotifytoken("Spotify features in progress");

  }

  const login = () => {
    console.log("Login");
    const CLIENT_ID = "cfb7e3670ce0436999ed4a498efb52c7"; // Your client id

    // const REDIRECT_URI = $location.absUrl().split('?')[0].replace("index.html", "") + "index.html"
    const REDIRECT_URI = window.location.origin + "/index.html";
    const scopes = "playlist-modify-private";
    const authUrl = "https://accounts.spotify.com/authorize" +
      `?client_id=${encodeURIComponent(CLIENT_ID)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  if (!spotifyAccessToken) {
    return <div><button onClick={login}>Login</button></div>;
  }

  if (spotifyAccessToken) {
    return <div>Logged In: {spotifytoken}</div>;
  }
}

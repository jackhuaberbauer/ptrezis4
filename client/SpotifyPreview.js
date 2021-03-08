
import React, { useState, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyContext from "./SpotifyContext";


export function SpotifyPreview(props) {
    console.log("Render Spotify preview");

    const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);

    if (!spotifyInfo.accessToken) return ""
    if (spotifyInfo.albumid) {
        const uris = [`spotify:album:${spotifyInfo.albumid}`]
        return <div id="spotifyplayer"><SpotifyPlayer
            token={spotifyInfo.accessToken}
            uris={uris}
            autoPlay="true"
            name="Plattentests Rezi Tabelle"
            /></div>;
    }   
    
    return <div>Fehler bei Preview</div>

}

import React, { useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyContext from "./SpotifyContext";


export function SpotifyPreview() {
    const { spotifyInfo } = useContext(SpotifyContext);

    if (!spotifyInfo.accessToken) return ""
    if (spotifyInfo.albumid) {
        const uris = [`spotify:album:${spotifyInfo.albumid}`]
        return <div id="spotifyplayer"><SpotifyPlayer
            token={spotifyInfo.accessToken}
            uris={uris}
            autoPlay={true}
            name="Plattentests Rezi Tabelle"
            initialVolume={0.5}
            /></div>;
    }   
    
    return <div></div>
}
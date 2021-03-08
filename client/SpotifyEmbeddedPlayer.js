
import React, { useState, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyContext from "./SpotifyContext";


export function SpotifyEmbeddedPlayer(props) {

    const [show, setShow] = useState(false);
    const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);
   
    
    const activate = () => {
        setShow(true);
    }
    if (props.spotifyid && !show) {
        return <button onClick={activate}>Show Preview</button>
    }

    if (props.spotifyid && show) {      
        
        const spotifyurl = "https://open.spotify.com/embed/album/" + props.spotifyid
        const player = <iframe src={spotifyurl} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        // player = <div>{props.id}</div>
        // return <div>{player}</div>
        const uris = [`spotify:album:${props.spotifyid}`]
        return <SpotifyPlayer
            token={spotifyInfo.accessToken}
            uris={uris}
            />;
    }
    return <div>Fehler bei Preview</div>

}
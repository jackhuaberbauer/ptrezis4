import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext'


export function Rezi(props) {
  const [data, setData] = useState(undefined);
  const {spotifytoken, setSpotifytoken} = useContext(AuthContext);
  

  if (!data) {
    fetch(`/rezidetails/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
    return <div>Loading</div>;
  }

  var cover;
  if (data.albumcover) {
    cover = <img className="rezicover" src={data.albumcover}></img>
  } else {
    cover = <img className="rezicover" src="img/nocover.png"></img>
  }

  var player;
  if (data.spotifyid && spotifytoken){
    const spotifyurl = "https://open.spotify.com/embed/album/" + data.spotifyid
    // player = <iframe src={spotifyurl} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  } else {
    player = <div>Login first</div>
  }

  
  return (
    <div className="rezi">
      {cover}
      <div className="rezibody">
        <div className="rezititle">{data.title}</div>
        <div className="rezirating">{data.rating} / 10</div>
        <div className="rezireferences">{data.references}</div>
        {player}

      </div>
    </div>
  );
}

import React, { useState, useContext } from 'react';
import { ReziReferences } from './ReziReferences';
import SpotifyContext from "./SpotifyContext";

export function Rezi(props) {
  const [data, setData] = useState(undefined);
  const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);

  const play = () => {
    const newInfo = Object.assign({}, spotifyInfo)
    newInfo.albumid = data.spotifyid;
    setSpotifyInfo(newInfo)
  }


  if (!data) {
    fetch(`/rezidetails/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
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
  var playbutton = undefined
  if (spotifyInfo.accessToken) {
    playbutton = <button className="playbutton" onClick={play}>Play</button>;
  }
  
  return (
    <div className="rezi">
      {cover}
      <div className="rezibody">
        <div className="rezititle">{data.title}</div>
        <div className="rezirating">{data.rating} / 10</div>
        <ReziReferences references={data.references}></ReziReferences>
        {playbutton}
      </div>
    </div>
  );
}

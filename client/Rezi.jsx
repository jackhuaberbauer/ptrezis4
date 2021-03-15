import React, { useState, useContext } from 'react';
import { ReziReferences } from './ReziReferences';
import SpotifyContext from "./SpotifyContext";

export function Rezi(props) {
  const [data, setData] = useState(undefined);
  const [showAllRezis, setShowAllRezis] = useState(false);
  const { spotifyInfo, setSpotifyInfo } = useContext(SpotifyContext);

  const play = () => {
    const newInfo = Object.assign({}, spotifyInfo)
    newInfo.albumid = data.spotifyid;
    setSpotifyInfo(newInfo)
  }

  const toggleShowAllReferences = () => {
    setShowAllRezis(!showAllRezis);
  }

  if (!data) {
    fetch(`/rezidetails/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
  if (spotifyInfo.accessToken && data.spotifyInfos) {
    playbutton = <button className="playbutton" onClick={play}>Play</button>;
  }
  
  var references = undefined;
  if (showAllRezis) {
    references = data.references;
  } else {
    references = data.references.substring(0,300) + "...";
  }

  var marked = undefined;
  if (spotifyInfo.followedArtists && spotifyInfo.followedArtists.length > 0) {
    for (const artist of spotifyInfo.followedArtists) {
      if (data.title.includes(artist)) {
        marked = true;
        break;
      }
    }
  }
  
  return (
    <div className={`rezi ${marked ? 'marked' : ''} rezi-${data.rating}`}>
      {cover}
      <div className="rezibody">
        <div className="rezititle">{data.title}</div>
        <div><span className="rezidate">{data.datestring}</span> - <span className="rezirating">{data.rating}</span> / 10 
        </div>
        <div onClick={toggleShowAllReferences}>
        <ReziReferences references={references}></ReziReferences>
        </div>
        {playbutton}
      </div>
    </div>
  );
}

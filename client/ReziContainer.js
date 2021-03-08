import React, { useState, createContext } from 'react';
import moment from 'moment';
import { PublishingDateContainer } from "./PublishingDateContainer";
import SpotifyContext from './SpotifyContext'
import { SpotifyLogin } from './SpotifyLogin';
import { SpotifyPreview } from './SpotifyPreview';

// Main Component
export function ReziContainer() {
  const [loadedPublishingDates, setLoadedPublishingDates] = useState(undefined);
  const [spotifyInfo, setSpotifyInfo] = useState({accessToken: undefined, albumid: undefined})
  const [testCount, setTestCount] = useState(0)
  console.log("Rendering ReziContainer");


  if (!loadedPublishingDates) {
    // Get last friday
    const today = moment();
    const lastFriday = today.day() == 5 ? 
      today
      : today.day() == 6 ? today.day(5)
      : today.day(-2)
    setLoadedPublishingDates([lastFriday]);
    return <div>Loading</div>;
  }
  const nextFridayToLoad = loadedPublishingDates[loadedPublishingDates.length - 1].clone().subtract(7, 'days');
  return (
    <SpotifyContext.Provider value={ {spotifyInfo, setSpotifyInfo} }>
    <div className="rezicontainer">
      <SpotifyLogin></SpotifyLogin>
      {loadedPublishingDates.map(currDate => <PublishingDateContainer key={currDate.format("DD.MM.yyyy")} publishingDate={currDate.format("DD.MM.yyyy")} />)}
      <button onClick={() => setLoadedPublishingDates([...loadedPublishingDates, nextFridayToLoad])}>Load next</button>
      <SpotifyPreview/>
    </div>  
    </SpotifyContext.Provider>
  );
}

export function getHashParams() {

  var hashParams = {};
  var e,
      a = /\+/g,  // Regex for replacing addition symbol with a space
      r = /([^&;=]+)=?([^&;]*)/g,
      d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
      q = window.location.hash.substring(1);

  while (e = r.exec(q))
     hashParams[d(e[1])] = d(e[2]);

  return hashParams;
}



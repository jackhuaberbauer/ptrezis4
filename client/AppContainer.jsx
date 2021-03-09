import React, { useState, createContext } from 'react';
import moment from 'moment';
import { PublishingDateContainer } from "./PublishingDateContainer";
import SpotifyContext from './SpotifyContext'
import { SpotifyLogin } from './SpotifyLogin';
import { SpotifyPreview } from './SpotifyPreview';

// Main Component
export function AppContainer() {
  const [loadedPublishingDates, setLoadedPublishingDates] = useState(undefined);
  const [spotifyInfo, setSpotifyInfo] = useState({accessToken: undefined, albumid: undefined})
  console.log("Rendering AppContainer");


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

  var triggered = false;
  window.addEventListener("scroll", function infiniteLoad() {
      const triggerBottom = window.innerHeight;
      // console.log(triggerBottom);
      const loadMore = document.querySelector("#loadMore");
      const currentPos = loadMore.getBoundingClientRect().top
      // console.log(loadMore.getBoundingClientRect().top);
      if (currentPos <= triggerBottom && triggered == false) {
        triggered =  true;
        this.removeEventListener('scroll', infiniteLoad);
        setLoadedPublishingDates([...loadedPublishingDates, nextFridayToLoad]);
    }

  });
  
  return (
    <SpotifyContext.Provider value={ {spotifyInfo, setSpotifyInfo} }>
    <div className="appcontainer">
      <SpotifyLogin></SpotifyLogin>
      
        {loadedPublishingDates.map(currDate => <PublishingDateContainer key={currDate.format("DD.MM.yyyy")} publishingDate={currDate.format("DD.MM.yyyy")} />)}

      <button id="loadMore" onClick={() => setLoadedPublishingDates([...loadedPublishingDates, nextFridayToLoad])}>Load next</button>
      
    </div> 
    <SpotifyPreview/> 
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



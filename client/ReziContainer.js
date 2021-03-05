import React, { useState } from 'react';
import moment from 'moment';
import { PublishingDateContainer } from "./PublishingDateContainer";

// Main Component
export function ReziContainer() {
  const [loadedPublishingDates, setLoadedPublishingDates] = useState(undefined);

  if (!loadedPublishingDates) {
    // Get last friday
    const today = moment();
    const lastFriday = today.day() == 5 ? today : today.day(-2);
    setLoadedPublishingDates([lastFriday]);
    return <div>Loading</div>;
  }
  const nextFridayToLoad = loadedPublishingDates[loadedPublishingDates.length - 1].clone().subtract(7, 'days');
  return (
    <div className="rezicontainer">
      {loadedPublishingDates.map(currDate => <PublishingDateContainer key={currDate.format("DD.MM.yyyy")} publishingDate={currDate.format("DD.MM.yyyy")} />)}
      <button onClick={() => setLoadedPublishingDates([...loadedPublishingDates, nextFridayToLoad])}>Load next</button>
    </div>
  );
}

import React, { useState } from 'react';
import { Rezi } from "./Rezi";


export function PublishingDateContainer(props) {
  console.log("Render PublishingDateContainer")
  const [publishingDate, setPublishingDate] = useState(props.publishingDate);
  const [data, setData] = useState(undefined);


  if (!data) {
    fetch(`/rezis?date=${publishingDate}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    return (
      <div className="publishingDateContainer">
        <div className="publishingDate">{publishingDate}</div>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="publishingDateContainer">
      <div className="publishingDate">{publishingDate}</div>
      <div className="reziGrid">
        {data.map(id => <Rezi key={id} id={id} />)}
      </div>
    </div>
  );
}

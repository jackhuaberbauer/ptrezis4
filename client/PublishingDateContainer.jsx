import React, { useState } from 'react';
import { Rezi } from "./Rezi";
import PropTypes from 'prop-types';


export function PublishingDateContainer(props) {
  console.log("Render PublishingDateContainer")
  const [data, setData] = useState(undefined);


  if (!data) {
    // Fetch data
    fetch(`/rezis?date=${props.publishingDate}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    return (
      <div className="publishingDateContainer">
        <div className="publishingDate">{props.publishingDate}</div>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="publishingDateContainer">
      <div className="publishingDate">{props.publishingDate}</div>
      <div className="reziGrid">
        {data.map(id => <Rezi key={id} id={id} />)}
      </div>
    </div>
  );
}

PublishingDateContainer.propTypes = {
  publishingDate: PropTypes.string
}

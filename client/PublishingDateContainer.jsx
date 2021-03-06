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
  }

  var content = undefined;
  if (data) {
    content = <div className="reziGrid">{data.map(id => <Rezi key={id} id={id} />)}</div>
  } else {
    content = <div>Loading</div>
  }

  return (
    <div className="publishingDateContainer">
      <div className="publishingDate">{props.publishingDate}</div>
      {content}
    </div>
  );
}

PublishingDateContainer.propTypes = {
  publishingDate: PropTypes.string
}

import React, { useState } from 'react';
import { Rezi } from "./Rezi";


export function CurrentRezisContainer() {
  console.log("Render CurrentRezisContainer")
  const [data, setData] = useState(undefined);

  if (!data) {
    // Fetch data
    fetch(`/currentrezis`)
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
    <div className="currentRezisContainer">
      <div className="publishingDate">CURRENT REZIS</div>
        {content}
    </div>
  );
}
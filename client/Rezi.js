import React, { useState } from 'react';


export function Rezi(props) {
  const [data, setData] = useState(undefined);

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
  
  return (
    <div className="rezi">
      {cover}
      <div className="rezibody">
        <div className="rezititle">{data.title}</div>
        <div className="rezirating">{data.rating} / 10</div>
        <div className="rezireferences">{data.references}</div>
      </div>
    </div>
  );
}

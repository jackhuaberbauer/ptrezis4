import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

// Main Component
function ReziContainer() {
  const [loadedPublishingDates, setLoadedPublishingDates] = useState(undefined);

  if (!loadedPublishingDates) {
    // Get last friday
    const today = moment();
    const lastFriday = today.day() == 5 ? today : today.day(-2);
    setLoadedPublishingDates([lastFriday]);
    return <div>Loading</div>;
  }
  const nextFridayToLoad = loadedPublishingDates[loadedPublishingDates.length - 1].clone().subtract(7, 'days')
  return (
    <div className="rezicontainer">
      {loadedPublishingDates.map(currDate => <PublishingDateContainer key={currDate.format("DD.MM.yyyy")} publishingDate={currDate.format("DD.MM.yyyy")} />)}
      <button onClick={() => setLoadedPublishingDates([...loadedPublishingDates, nextFridayToLoad ])}>Load next</button>
    </div>
  );
}
// 
function PublishingDateContainer(props) {
  const [publishingDate, setPublishingDate] = useState(props.publishingDate);
  const [data, setData] = useState(undefined);

  if (!data) {
    fetch(`/rezis?date=${publishingDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

function Rezi(props) {
  const [data, setData] = useState(undefined);

  if (!data) {
    fetch(`/rezidetails/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
      return <div>Loading</div>
  }
  
  return (
  <div className="rezi">
    <img className="rezicover" src={data.albumcover}></img>
    <div className="rezibody">
      <div className="rezititle">{data.title}</div>
      <div className="rezirating">{data.rating} / 10</div>
      <div className="rezireferences">{data.references}</div>
    </div>
    </div>
  );
}
//blub
const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ReziContainer), domContainer);



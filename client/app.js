import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

function ReziContainer() {
  const [data, setData] = useState(undefined);
  console.log("Calling ReziContainer()")

  // Get last friday
  const today = moment();
  const lastFriday = today.day() == 5 ? today : today.day(-2);
  console.log("Last friday", lastFriday);

//   if (!data) {
//     fetch(`/rezis?date=${lastFriday.format("DD.MM.yyyy")}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setData(data);
//       });
//     return <div>Loading...</div>;
//   }

  return <div><PublishingDateContainer publishingDate={lastFriday.format("DD.MM.yyyy")}/></div>;
}

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
      {data.map(rezi => <Rezi key={rezi.url} data={rezi} />)}
    </div>
  );
}

function Rezi(props) {
    return <div>{props.data.title}</div>
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ReziContainer), domContainer);



import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

function ReziContainer() {
  const [data, setData] = useState(undefined);

  // Get last friday
  const today = moment();
  const lastFriday = today.day() == 5 ? today : today.day(-2);
  console.log("Last friday", lastFriday);

  if (!data) {
    fetch(`/rezis?date=${lastFriday.format("DD.MM.yyyy")}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
    return React.createElement("div", undefined, "Loading");
  }

  return React.createElement("div", undefined, "Data loaded");
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ReziContainer), domContainer);



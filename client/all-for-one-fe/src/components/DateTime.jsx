// import Moment from "moment";

// let dateAndTime = Moment().format("dddd, MMMM Do YYYY, h:mm a");

// const DateTime = () => {
//   return <h1 className="date-time">{dateAndTime}</h1>;
// };

// export default DateTime;

import { useState, useEffect } from "react";
import { loginUser } from "../utils/api";

const DateTime = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <div className="date-time">
      <h1 className="bold day mr20">
        {" "}
        {dateState.toLocaleDateString("en-GB", {
          weekday: "long",
        })}
      </h1>
      <h1 className="bold date mr20">
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h1>
      <h1 className="bold time mr20">
        {dateState.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </h1>
    </div>
  );
};

export default DateTime;

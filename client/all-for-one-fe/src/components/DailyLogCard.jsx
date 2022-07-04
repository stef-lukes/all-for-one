import { useEffect, useState } from "react";
import { getDailyLog } from "../utils/api";
import DailyLogForm from "./DailyLogForm";
import Header from "./Header";

const DailyLogCard = () => {
  const [currentDailyLog, setCurrentDailyLog] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getDailyLog()
      .then((logEntry) => {
        setCurrentDailyLog(logEntry);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data);
      });
  }, []);

  if (isError) {
    return <p>{isError.msg}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {currentDailyLog.map((logEntry) => {
          return (
            <>
              <h1>{logEntry.title}</h1>
              <p>{logEntry.body}</p>
              <p>{logEntry.categories}</p>
              <button>Edit</button>
              <button>Delete</button>
            </>
          );
        })}
      </ul>
      <DailyLogForm setCurrentDailyLog={setCurrentDailyLog} />
    </>
  );
};

export default DailyLogCard;

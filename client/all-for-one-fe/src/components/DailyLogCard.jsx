import { useEffect, useState } from "react";
import { getDailyLog } from "../utils/api";
import DailyLogForm from "./DailyLogForm";
import DeleteDailyLogCard from "./DeleteDailyLogCard";
import cardAccent from "../assets/card-accent.svg";
import smiley from "../assets/smiley.svg";

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
    <section>
      <ul className="daily-card-list">
        {currentDailyLog.map((logEntry) => {
          return (
            <li key={logEntry._id} className="card-wrapper relative">
              <img src={logEntry.avatarUrl} alt="" className="smiley" />
              <img src={cardAccent} alt="" className="card-accent" />
              <article className="post-card">
                <div className="log-post-info flex">
                  <h3 className="blue right-m10">{logEntry.name}: </h3>
                  <h4 className="red no-margin">{logEntry.title}</h4>
                </div>

                <p className="dark-grey no-margin">{logEntry.body}</p>
                <p className="small thin grey absolute-b">
                  <span className="bold-medium">tags:</span>{" "}
                  {logEntry.categories}
                </p>
                <DeleteDailyLogCard
                  logEntry={logEntry}
                  setCurrentDailyLog={setCurrentDailyLog}
                />
              </article>
            </li>
          );
        })}
      </ul>
      <DailyLogForm setCurrentDailyLog={setCurrentDailyLog} />
    </section>
  );
};

export default DailyLogCard;

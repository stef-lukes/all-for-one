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
      <ul>
        {currentDailyLog.map((logEntry) => {
          return (
            <article className="card-wrapper">
              <img src={smiley} alt="" className="smiley" />
              <img src={cardAccent} alt="" className="card-accent" />
              <li key={logEntry.body} className="post-card">
                <h3>{logEntry.title}</h3>
                <p>{logEntry.body}</p>
                <p>{logEntry.categories}</p>
                <DeleteDailyLogCard
                  logEntry={logEntry}
                  setCurrentDailyLog={setCurrentDailyLog}
                />
              </li>
            </article>
          );
        })}
      </ul>
      <DailyLogForm setCurrentDailyLog={setCurrentDailyLog} />
    </section>
  );
};

export default DailyLogCard;

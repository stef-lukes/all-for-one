import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import DailyLogCard from "./DailyLogCard";
import { getDailyLog } from "../utils/api";

const DailyLog = () => {
  const { user } = useContext(UserContext);

  getDailyLog().then((dailyLog) => {
    console.log(dailyLog);
  });

  return (
    <section className="post-wrapper">
      <h2 className="list-intro">Lets's see what's been happening today...</h2>
      <DailyLogCard />
    </section>
  );
};

export default DailyLog;

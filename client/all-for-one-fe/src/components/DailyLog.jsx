import DailyLogForm from "./DailyLogForm";
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
    <>
      <h1>Daily Log</h1>
      <DailyLogForm />
      <DailyLogCard />
    </>
  );
};

export default DailyLog;

import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthProvider";
import DailyLogCard from "./DailyLogCard";
import { getDailyLog } from "../utils/api";
import DateTime from "./DateTime";

const DailyLog = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user");
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage");
      setUser(storedUser);
    }
  }, []);

  getDailyLog().then((dailyLog) => {
    console.log(dailyLog);
  });

  return (
    <section className="post-wrapper">
      <h2 className="list-intro">Lets's see what's been happening today...</h2>
      <DateTime />
      <DailyLogCard />
    </section>
  );
};

export default DailyLog;

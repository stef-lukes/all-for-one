import DailyLogForm from "./DailyLogForm";
import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";

const DailyLog = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Daily Log</h1>
      <DailyLogForm />
    </>
  );
};

export default DailyLog;

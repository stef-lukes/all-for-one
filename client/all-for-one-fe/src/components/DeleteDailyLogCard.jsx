import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { deleteDailyLog } from "../utils/api";

const DeleteDailyLogCard = ({ logEntry, setCurrentDailyLog }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    const dailyLogId = logEntry._id;
    deleteDailyLog(dailyLogId).then(() => {
      alert("Log entry deleted.");
      setCurrentDailyLog((currLogEntry) => {
        let updatedLogEntry = currLogEntry.filter(
          (logEntry) => logEntry._id !== dailyLogId
        );
        return updatedLogEntry;
      });
    });
  };

  if (user.user._id === logEntry.user || user.user.isAdmin === true) {
    return <button onClick={handleClick}>Delete</button>;
  }
};

export default DeleteDailyLogCard;

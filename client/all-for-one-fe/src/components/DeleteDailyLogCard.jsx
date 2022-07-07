import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { deleteDailyLog } from "../utils/api";
import binIcon from "../assets/bin.svg";

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
    return (
      <button className="delete-btn absolute-br" onClick={handleClick}>
        <img src={binIcon} alt="" />
      </button>
    );
  }
};

export default DeleteDailyLogCard;

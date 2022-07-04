import { useEffect, useState, useContext } from "react";
import { createDailyLogEntry } from "../utils/api";
import { UserContext } from "../contexts/AuthProvider";

const DailyLogForm = () => {
  const { user } = useContext(UserContext);

  const initialValues = {
    user: user.user._id,
    title: "",
    body: "",
    categories: "",
  };

  const [logEntryData, setLogEntryData] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    createDailyLogEntry(logEntryData).then((newEntry) => {
      setLogEntryData(newEntry);
      console.log(newEntry);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogEntryData({ ...logEntryData, [name]: value });
  };

  return (
    <>
      <h1>Add an entry to your Daily Log</h1>
      <form onSubmit={handleSubmit}>
        <label aria-label="activity name">
          <input
            id="title"
            name="title"
            type="text"
            value={logEntryData.title}
            placeholder="Enter activity name"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="body text">
          <textarea
            id="body"
            name="body"
            type="text"
            value={logEntryData.body}
            placeholder="Enter activity details"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="categories">
          <input
            id="categories"
            name="categories"
            type="text"
            value={logEntryData.categories}
            placeholder="Enter category"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <button>Add entry</button>
      </form>
    </>
  );
};

export default DailyLogForm;

import { useEffect, useState } from "react";
import { createDailyLogEntry } from "../utils/api";

const DailyLogForm = () => {
  const initalValues = {
    user: "",
    activityName: "",
    bodyText: "",
    categories: "",
    colour: "",
    order: 1,
    isRecurring: false,
  };
  const [logEntryData, setLogEntryData] = useState(initalValues);

  // useEffect(() => {
  //   createDailyLogEntry(logEntryData).then((newEntry) => {
  //     console.log(newEntry);
  //     setLogEntryData(newEntry);
  //     return newEntry;
  //   });
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    createDailyLogEntry(logEntryData).then((newEntry) => {
      setLogEntryData(newEntry);
      console.log(logEntryData);
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
            id="activityName"
            name="activityName"
            type="text"
            value={logEntryData.activityName}
            placeholder="Enter activity name"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="body text">
          <input
            id="bodyText"
            name="bodyText"
            type="text"
            value={logEntryData.bodyText}
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
        <label aria-label="colour">
          <input
            id="colour"
            name="colour"
            type="text"
            value={logEntryData.colour}
            placeholder="Enter colour"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="order">
          <input
            id="order"
            name="order"
            type="text"
            value={logEntryData.order}
            placeholder="Order"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="is recurring">
          <input
            id="isRecurring"
            name="isRecurring"
            type="text"
            value={logEntryData.isRecurring}
            placeholder="Is Recurring?"
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

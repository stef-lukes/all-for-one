import { useState, useContext } from "react";
import { createDailyLogEntry } from "../utils/api";
import { UserContext } from "../contexts/AuthProvider";

const DailyLogForm = ({ setCurrentDailyLog }) => {
  const { user } = useContext(UserContext);

  const initialValues = {
    user: user.user._id,
    name: user.user.name,
    avatarUrl: user.user.avatarUrl,
    colour: user.user.colour,
    title: "",
    body: "",
    categories: "",
  };

  const [logEntryData, setLogEntryData] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    createDailyLogEntry(logEntryData).then((newEntry) => {
      setCurrentDailyLog((currLogEntry) => {
        return [...currLogEntry, newEntry];
      });
    });
    setLogEntryData(initialValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogEntryData((currentDailyLog) => {
      return { ...currentDailyLog, [name]: value };
    });
  };

  console.log(logEntryData);
  return (
    <section className="post-form-wrapper">
      <h2 className="white post-form-heading">
        Add an entry to your Daily Log
      </h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label aria-label="activity name">
          <input
            id="title"
            name="title"
            type="text"
            value={logEntryData.title}
            placeholder="Enter a post title"
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
            placeholder="Add more detail"
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
            placeholder="Tags"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <button className="log-reg-btn post-form-btn">Add entry</button>
      </form>
    </section>
  );
};

export default DailyLogForm;

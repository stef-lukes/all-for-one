import { useEffect, useState } from "react";
import { createDailyLogEntry } from "../utils/api";

const DailyLogEntry = () => {
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

  useEffect(() => {
    createDailyLogEntry(logEntryData).then((newEntry) => {
      console.log(newEntry);
      setLogEntryData(newEntry);
      return newEntry;
    });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogEntryData({ ...logEntryData, [name]: value });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   postCommentOnArticle(article_id, addedComment.body, user.username)
  //     .then((postedComment) => {
  //       setIsPosted(true);
  //       setComments((currComments) => {
  //         return [postedComment, ...currComments];
  //       });
  //     })
  //     .catch((err) => {
  //       setError(err.response.data);
  //     });
  //   setAddedComment({ body: "", username: "" });
  // };

  return (
    <>
      <h1>Add an entry to your daily Log</h1>
      <form onSubmit={handleSubmit}>
        <label aria-label="user">
          <input
            id="user"
            name="user"
            type="text"
            value={logEntryData.user}
            placeholder="Enter user"
            onBlur={handleChange}
          />
        </label>
        <button>Add entry</button>
      </form>
    </>
  );
};

export default DailyLogEntry;

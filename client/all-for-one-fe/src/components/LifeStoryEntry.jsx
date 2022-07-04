import { useState, useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { postLifeStory } from "../utils/api";

const LifeStoryEntry = ({ setCurrentLifeStory }) => {
  const { user } = useContext(UserContext);

  const initialValues = {
    user: user.user._id,
    heading: "",
    bodyText: "",
    categories: "",
  };

  const [lifeStoryEntry, setlifeStoryEntry] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    postLifeStory(lifeStoryEntry).then((newEntry) => {
      setCurrentLifeStory((currLifeStory) => {
        return [newEntry, ...currLifeStory];
      });
    });
    setlifeStoryEntry(initialValues);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setlifeStoryEntry((currentLifeStory) => {
      return { ...currentLifeStory, [name]: value };
    });
  };

  return (
    <>
      <h1>Add Life Story Entry</h1>
      <form onSubmit={handleSubmit}>
        <label aria-label="heading">
          <input
            id="heading"
            name="heading"
            type="text"
            value={lifeStoryEntry.heading}
            placeholder="Enter heading"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="body text">
          <textarea
            id="bodyText"
            name="bodyText"
            type="text"
            value={lifeStoryEntry.bodyText}
            placeholder="Enter details"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </label>
        <label aria-label="categories">
          <input
            id="categories"
            name="categories"
            type="text"
            value={lifeStoryEntry.category}
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

export default LifeStoryEntry;

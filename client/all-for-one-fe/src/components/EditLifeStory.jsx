import { useContext, useState } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { editLifeStory } from "../utils/api";

const EditLifeStory = ({ lifeStory }) => {
  const { user } = useContext(UserContext);

  const initialValues = {
    user: user.user._id,
    heading: "",
    bodyText: "",
    categories: "",
  };

  const [editedLifeStoryEntry, setEditedLifeStoryEntry] =
    useState(initialValues);

  const handleClick = () => {
    const lifeStoryId = lifeStory._id;
    editLifeStory(lifeStoryId, editedLifeStoryEntry).then((updatedEntry) => {
      console.log(updatedEntry);
      setEditedLifeStoryEntry(updatedEntry);
    });
    setEditedLifeStoryEntry(initialValues);
  };

  return <button onClick={handleClick}>Edit</button>;
};

export default EditLifeStory;

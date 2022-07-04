import { UserContext } from "../contexts/AuthProvider";
import { useState, useContext } from "react";
import { deleteLifeStory } from "../utils/api";

const DeleteLifeStory = ({ lifeStory, setCurrentLifeStory }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    const lifeStoryId = lifeStory._id;

    deleteLifeStory(lifeStoryId).then(() => {
      setCurrentLifeStory((currLifeStory) => {
        let updatedLifeStory = currLifeStory.filter(
          (lifeStori) => lifeStori._id !== lifeStoryId
        );
        return updatedLifeStory;
      });
    });
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteLifeStory;

import { UserContext } from "../contexts/AuthProvider";
import { useState, useContext } from "react";
import { deleteLifeStory } from "../utils/api";

const DeleteLifeStory = ({ lifeStory, setCurrentLifeStory }) => {
  //   console.log(lifeStory._id, "in Delete component");
  const { user } = useContext(UserContext);
  //   console.log(user);
  const handleClick = () => {
    const lifeStoryId = lifeStory._id;
    console.log(lifeStoryId, "on line 11");
    deleteLifeStory(lifeStoryId).then(() => {
      setCurrentLifeStory((currLifeStory) => {
        let updatedLifeStory = currLifeStory.filter(
          (abc) => abc._id !== lifeStoryId
        );
        return updatedLifeStory;
      });
    });
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteLifeStory;

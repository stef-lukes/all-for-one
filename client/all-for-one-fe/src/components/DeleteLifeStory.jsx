import { UserContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { deleteLifeStory } from "../utils/api";

const DeleteLifeStory = ({ lifeStory, setCurrentLifeStory }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    const lifeStoryId = lifeStory._id;
    deleteLifeStory(lifeStoryId).then(() => {
      alert("Life story deleted");
      setCurrentLifeStory((currLifeStory) => {
        let updatedLifeStory = currLifeStory.filter(
          (lifeStori) => lifeStori._id !== lifeStoryId
        );
        return updatedLifeStory;
      });
    });
  };

  if (user.user._id === lifeStory.user || user.user.isAdmin === true) {
    return <button onClick={handleClick}>Delete</button>;
  }
};

export default DeleteLifeStory;

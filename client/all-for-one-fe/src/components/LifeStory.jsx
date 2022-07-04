import Header from "./Header";
import LifeStoryEntry from "./LifeStoryEntry";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { getLifeStory } from "../utils/api";
import DeleteLifeStory from "./DeleteLifeStory";

const LifeStory = () => {
  const [currentLifeStory, setCurrentLifeStory] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    getLifeStory()
      .then((lifeStory) => {
        setCurrentLifeStory(lifeStory);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  if (isError) {
    return <p>{isError.msg}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <ul>
        {currentLifeStory.map((lifeStory) => {
          return (
            <>
              <h1>{lifeStory.heading}</h1>
              <p>{lifeStory.bodyText}</p>
              <p>{lifeStory.categories}</p>
              <button>Edit</button>
              <DeleteLifeStory
                lifeStory={lifeStory}
                setCurrentLifeStory={setCurrentLifeStory}
              />
            </>
          );
        })}
      </ul>
      <LifeStoryEntry setCurrentLifeStory={setCurrentLifeStory} />
    </>
  );
};
export default LifeStory;

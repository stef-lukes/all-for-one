import Header from "./Header";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { getLifeStory } from "../utils/api";
import { Link } from "react-router-dom";
import LifeStoryCategory from "./LifeStoryCategory";

const LifeStory = () => {
  const [currentLifeStory, setCurrentLifeStory] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    getLifeStory()
      .then((lifeStory) => {
        console.log(lifeStory);
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
          console.log(lifeStory, "???");
          return (
            <>
              <Link
                lifestory={lifeStory}
                key={lifeStory._id}
                className="story-link"
                to={`/lifestory/${lifeStory.category}`}
              >
                {lifeStory.category}
              </Link>
              <LifeStoryCategory lifeStory={lifeStory} />
            </>
          );
        })}
      </ul>
    </>
  );
};
export default LifeStory;

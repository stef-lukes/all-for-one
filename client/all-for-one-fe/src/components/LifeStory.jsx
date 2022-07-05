import Header from "./Header";
import Navbar from "./Navbar";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { getLifeStory } from "../utils/api";
import { Link } from "react-router-dom";
import LifeStoryCategory from "./LifeStoryCategory";

const LifeStory = () => {
  const {user, setUser} = useContext(UserContext);
  const [currentLifeStory, setCurrentLifeStory] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  
  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user")
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage")
      setUser(storedUser)
    }
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

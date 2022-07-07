import Header from "./Header";
import Navbar from "./Navbar";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { getLifeStory } from "../utils/api";
import { Link } from "react-router-dom";
import LifeStoryCategory from "./LifeStoryCategory";

const LifeStory = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentLifeStory, setCurrentLifeStory] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user");
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage");
      setUser(storedUser);
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
      <main>
        <article className="intro-msg width-80">
          <h1>Life Story</h1>
          <p>
            Welcome to the <span className="bold blue">Life Story</span>{" "}
            section, where you can build a map of your loved one's memories.
          </p>
        </article>
        <ul>
          <h2 className="list-intro">Please select a category:</h2>
          {currentLifeStory.map((lifeStory) => {
            console.log(lifeStory, "???");
            const passLifeStory = { ...lifeStory };
            return (
              <>
                <Link
                  state={passLifeStory}
                  key={lifeStory._id}
                  className="story-link white bold"
                  to={`/lifestory/${lifeStory.category}`}
                >
                  {lifeStory.category}
                </Link>
              </>
            );
          })}
        </ul>
      </main>
    </>
  );
};
export default LifeStory;

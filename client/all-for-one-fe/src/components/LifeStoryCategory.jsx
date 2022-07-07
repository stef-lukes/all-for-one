import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import QuestionAnswer from "./QuestionAnswer";

const LifeStoryCategory = (lifestory) => {
  const location = useLocation();
  console.log(location.state);

  // const handleUpdate = (event) => {
  //   event.preventDefault();

  //   editLifeStory(currAnswer).then((loggedInUser) => {
  //     setUser(loggedInUser);
  //     localStorage.setItem("all-for-one-user", JSON.stringify(loggedInUser));
  //     navigate("/dashboard");
  //   });
  // };

  const questionsArray = location.state.questionAnswer;
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <article className="intro-msg">
          <h1>{location.state.category}</h1>
          <p>
            Answer the question prompts below about{" "}
            <span className="bold blue">{location.state.category}</span> to
            prompt memories and meaningful discusssion which you can record and
            collate.
          </p>
        </article>
        <ul>
          {questionsArray.map((qaObject) => {
            return (
              <>
                <QuestionAnswer key={qaObject.qaID} qaObject={qaObject} />
              </>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default LifeStoryCategory;

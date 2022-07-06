import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import QuestionAnswer from "./QuestionAnswer";

const LifeStoryCategory = (lifestory) => {
  // set state answer : id, answer
  // use text editor to update state
  // use that in update function
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
      <h1>{location.state.category}</h1>
      <ul>
        {questionsArray.map((qaObject) => {
          return (
            <>
              <QuestionAnswer key={qaObject.qaID} qaObject={qaObject} />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default LifeStoryCategory;

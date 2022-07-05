import { EditTextarea } from "react-edit-text";

const LifeStoryCategory = (lifestory) => {
  console.log(lifestory.lifeStory.questionAnswer, "<--- QA");
  const questionsArray = lifestory.lifeStory.questionAnswer;
  return (
    <>
      <ul>
        {questionsArray.map((qaObject) => {
          return (
            <>
              <li>
                <h3>{qaObject.question}</h3>
                <EditTextarea placeholder="Input your answer here." />
                <p></p>
                <button>Add</button>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default LifeStoryCategory;

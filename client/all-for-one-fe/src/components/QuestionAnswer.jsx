import { EditTextarea } from "react-edit-text";
import { useState } from "react";
import { editLifeStory } from "../utils/api";

const QuestionAnswer = ({ qaObject }) => {
  console.log(qaObject);

  const [currAnswer, setCurrAnswer] = useState({
    qaID: qaObject._id,
    answer: qaObject.answer,
  });

  const updateAnswer = (event) => {
    const { id, value } = event.target;
    setCurrAnswer({ ...currAnswer, [id]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editLifeStory(currAnswer.qaID, currAnswer.answer).then((response) => {
      console.log(response, "<--- response");
    });
  };

  return (
    <>
      <h3>{qaObject.question}</h3>
      <EditTextarea
        defaultValue={qaObject.answer}
        id="answer"
        value={currAnswer.answer}
        placeholder="Enter your answer here."
        onChange={updateAnswer}
      />
      <p></p>
      <button type="submit" onClick={handleUpdate}>
        Add your answer!
      </button>
    </>
  );
};

export default QuestionAnswer;

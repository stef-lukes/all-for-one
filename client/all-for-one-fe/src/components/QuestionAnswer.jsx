import { EditTextarea } from "react-edit-text";
import { useState } from "react";
import { editLifeStory } from "../utils/api";

const QuestionAnswer = ({ qaObject }) => {
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
    <article className="qa-wrap">
      <h3 className="white bold no-margin list-intro">{qaObject.question}</h3>
      <EditTextarea
        className="edit-text"
        defaultValue={qaObject.answer}
        id="answer"
        value={currAnswer.answer}
        placeholder="Enter your answer here."
        onChange={updateAnswer}
      />
      <button
        className="log-reg-btn post-form-btn"
        type="submit"
        onClick={handleUpdate}
      >
        Update your answer!
      </button>
    </article>
  );
};

export default QuestionAnswer;

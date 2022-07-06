import { EditTextarea } from "react-edit-text";

const QuestionAnswer = ({ qaObject }) => {
  console.log(qaObject);
  return (
    <>
      <h3>{qaObject.question}</h3>
      <EditTextarea
        defaultValue={qaObject.answer}
        id="answer"
        // value={currAnswer.answer}
        placeholder="Enter your answer here."
        // onChange={updateAnswer}
        // onClick={(e) => setQaID(qaObject.qaID)}
      />
      <p></p>
      {/* <button type="submit" onSubmit={handleUpdate}>
                  Update your answer!
                </button> */}
    </>
  );
};

export default QuestionAnswer;

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
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default LifeStoryCategory;

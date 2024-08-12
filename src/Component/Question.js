import React from "react";
import Options from "./Options";

function Question({ question, dispatch, answer, points }) {
  console.log(question);
  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        points={points}
      />
    </div>
  );
}

export default Question;

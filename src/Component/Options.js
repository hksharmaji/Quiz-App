import React from "react";

function Options({ question, dispatch, answer, points }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question?.options.map((opt, index) => (
        <button
          key={opt}
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;

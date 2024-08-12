import React from "react";

function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> / {maxPossiblePoints}(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">( HishScore is : {highScore} )</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;

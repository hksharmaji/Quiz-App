import { useEffect, useReducer } from "react";
import Header from "./Component/Header";
import Main from "./Component/Main";
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import Startscreen from "./Component/Startscreen";
import Question from "./Component/Question";
import NextButton from "./Component/NextButton";
import Progress from "./Component/Progress";
import FinishScreen from "./Component/FinishScreen";
import Footer from "./Component/Footer";
import Timer from "./Component/Timer";
const SEC_PER_SEC = 30;
const initialState = {
  questions: [],
  //status can be  loading , ready , error, finisheds
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "received":
      return { ...state, questions: action.payload, status: "ready" };
    case "datafailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_SEC,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        question: state.questions,
        status: "ready",
      };
    case "timer":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      break;
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function (params) {
    fetch("https://my-json-server.typicode.com/hksharmaji/Quiz-App/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "received", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Startscreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            highScore={highScore}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

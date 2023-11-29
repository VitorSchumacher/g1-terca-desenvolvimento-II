import { createContext, useCallback, useContext, useState } from "react";
import { UserContext } from "./user";
import { addNewResponse } from "../services/questions";

export const QuestionsrContext = createContext({});

function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState();
  const [currentIssue, setCurrentIssue] = useState();
  const [finallyResult, setFinallyResult] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [questionAct, setQuestionAct] = useState(1);
  const [last, setLast] = useState(false);
  const { user } = useContext(UserContext);


  const getQuestions = useCallback(async (quant, difficulty) => {
    try {
      let response = await fetch(
        `https://opentdb.com/api.php?amount=${quant}&category=18&difficulty=${difficulty}&type=multiple`
      );
      let data = await response.json();
      setQuestions(data.results);
      const allOptions = [
        ...data.results[0].incorrect_answers,
        data.results[0].correct_answer,
      ];
      setCurrentIssue({
        ...data.results[0],
        answers: allOptions.sort(() => Math.random() - 0.5),
      });
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  const validateCorrect = (response) => {
    if (response === currentIssue.correct_answer) {
      setFinallyResult((prev) => {
        return { ...prev, correct: prev.correct + 1 };
      });
    } else {
      setFinallyResult((prev) => {
        return { ...prev, incorrect: prev.incorrect + 1 };
      });
    }
  };

  const avanceQuestion = (response) => {
    if (questionAct === questions.length) {
      validateCorrect(response);
      setLast(true);
    } else {
      validateCorrect(response);
      const allOptions = [
        ...questions[questionAct].incorrect_answers,
        questions[questionAct].correct_answer,
      ];
      setCurrentIssue({
        ...questions[questionAct],
        answers: allOptions.sort(() => Math.random() - 0.5),
      });
      setQuestionAct((prev) => {
        return prev + 1;
      });
    }
  };

  const submmitResponse = () => {
    console.log(
      "🚀 ~ file: questions.js:70 ~ submmitResponse ~ finallyResult:",
      finallyResult
    );
    addNewResponse(finallyResult,user.questions,user.option)
  };

  return (
    <QuestionsrContext.Provider
      value={{
        getQuestions,
        questions,
        currentIssue,
        avanceQuestion,
        last,
        questionAct,
        finallyResult,
        submmitResponse,
      }}
    >
      {children}
    </QuestionsrContext.Provider>
  );
}
export default QuestionsProvider;

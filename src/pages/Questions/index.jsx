import { useContext, useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { QuestionsrContext } from "../../contexts/questions";
import {
  InputLabel,
  TextQuestion,
  TextQuestionAlter,
  TouchableQuestion,
  ViewMain,
  ViewQuestions,
} from "./styles";
import { UserContext } from "../../contexts/user";
import { useNavigation } from "@react-navigation/native";

const Questions = () => {
  const { currentIssue, avanceQuestion, questionAct, last, submmitResponse } =
    useContext(QuestionsrContext);
  const { user } = useContext(UserContext);
  const { navigate } = useNavigation();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (last) {
      console.log("aq acabou!");
      submmitResponse();
      navigate("Result");
    }
  }, [last]);

  useEffect(() => {
    setTimer(30);
  }, [currentIssue]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          avanceQuestion(null); 
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentIssue, avanceQuestion]);

  if (!currentIssue) {
    return <View />;
  }
  return (
    <ImageBackground
      resizeMode="repeat"
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
      source={require("../../assets/imageBackground.png")}
    >
      <ViewMain>
        <InputLabel>{currentIssue.category}</InputLabel>
        <InputLabel>{timer}</InputLabel>
        <InputLabel>
          Question {questionAct} of {user.questions}
        </InputLabel>
        <TextQuestion>{currentIssue.question}</TextQuestion>
        <ViewQuestions>
          {currentIssue.answers.map((answere) => (
            <TouchableQuestion
              onPress={() => {
                avanceQuestion(answere);
              }}
            >
              <TextQuestionAlter>{answere}</TextQuestionAlter>
            </TouchableQuestion>
          ))}
        </ViewQuestions>
      </ViewMain>
    </ImageBackground>
  );
};

export default Questions;

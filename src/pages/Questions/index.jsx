import { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (last) {
      console.log("aq acabou!");
      submmitResponse();
      navigate("Result");
    }
  }, [last]);
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

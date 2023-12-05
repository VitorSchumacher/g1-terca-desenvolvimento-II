import { useContext, useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, ScrollView } from "react-native";
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

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const Questions = () => {
  const { currentIssue, avanceQuestion, questionAct, last, submmitResponse } =
    useContext(QuestionsrContext);
  const { user } = useContext(UserContext);
  const { navigate } = useNavigation();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (last) {
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
        updateAnimatedWidth(prevTimer);
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          avanceQuestion(null);
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentIssue, avanceQuestion]);

  const animatedWidth = useSharedValue(31);

  const animatedStyle = useAnimatedStyle(() => {
    const color =
      animatedWidth.value > 15
        ? "green"
        : animatedWidth.value > 5
        ? "yellow"
        : "red";

    return {
      width: withSpring((animatedWidth.value / 9) * 100),
      height: 10,
      backgroundColor: color,
    };
  });

  const updateAnimatedWidth = (value) => {
    animatedWidth.value = value;
  };
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
      <ScrollView  style={{ flex: 1}}>
        <ViewMain>
          <InputLabel>{currentIssue.category}</InputLabel>
          <InputLabel>{timer}</InputLabel>
          <Animated.View style={[styles.timerCircle, animatedStyle]} />
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
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  timerCircle: {
    height: 10, // Altura do círculo
    backgroundColor: "green", // Cor do círculo
    borderRadius: 50, // Torna o círculo redondo
    marginBottom: 10, // Espaçamento inferior
  },
});
export default Questions;

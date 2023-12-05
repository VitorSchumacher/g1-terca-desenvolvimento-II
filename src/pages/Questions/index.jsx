import { useContext, useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
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

  const [circleColor, setCircleColor] = useState("green");

  useEffect(() => {
    if (last) {
      submmitResponse();
      navigate("Result");
    }
  }, [last]);

  useEffect(() => {
    setTimer(30);
    setCircleColor("green");
  }, [currentIssue]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        startAnimation(prevTimer);
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          avanceQuestion(null);
        } else if (prevTimer <= 30 && prevTimer > 15) {
          setCircleColor("green");
        } else if (prevTimer <= 15 && prevTimer > 5) {
          setCircleColor("yellow");
        } else if (prevTimer <= 5) {
          setCircleColor("red");
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentIssue, avanceQuestion]);


  const animatedWidth = useSharedValue(333,3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedWidth.value), 
      height: 10,
      backgroundColor: circleColor,
    };
  },);

  const startAnimation = (value) => {
    animatedWidth.value = (value / 9) * 100; 
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
      <ViewMain>
        <InputLabel>{currentIssue.category}</InputLabel>
        <Animated.View style={[styles.timerCircle, animatedStyle]} />
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
const styles = StyleSheet.create({
  timerCircle: {
    height: 10, // Altura do círculo
    backgroundColor: "green", // Cor do círculo
    borderRadius: 50, // Torna o círculo redondo
    marginBottom: 10, // Espaçamento inferior
  },
});
export default Questions;

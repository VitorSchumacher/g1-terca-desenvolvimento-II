import { onValue, ref } from "firebase/database";
import { View, Text, ImageBackground } from "react-native";
import { db } from "../../firebaseConnection";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import { ButtonText, InputLabel, TextPoints, TextQuestion, ViewButton, ViewItemList, ViewList, ViewMain } from "./styles";
import { QuestionsrContext } from "../../contexts/questions";

const Result = () => {
  const [data, setData] = useState();
  const [position, setPosition] = useState();
  const [flag, setFlag] = useState(true);
  const { user } = useContext(UserContext);
  const { finallyResult } = useContext(QuestionsrContext);
  console.log(
    "🚀 ~ file: index.jsx:13 ~ Result ~ finallyResult:",
    finallyResult
  );
  console.log("🚀 ~ file: index.jsx:11 ~ Result ~ user:", user);

  const fetchData = async () => {
    try {
      onValue(
        ref(db, `/results/${user.option}/${user.questions}`),
        (querySnapShot) => {
          const TasData = querySnapShot.val() || {};
          setData(TasData);
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (flag) {
      fetchData();
    }
  }, [user, flag]);

  useEffect(() => {
    if (data && flag) {
      const dataArray = Object.entries(data).map((entry) => entry[1]);
      const sortedArray = dataArray.sort((a, b) => b.correct - a.correct);
      console.log(
        "🚀 ~ file: index.jsx:44 ~ useEffect ~ sortedArray:",
        sortedArray
      );
      const userIndex = sortedArray.findIndex(
        (entry) => entry.email === user.email
      );
      setPosition(userIndex);
      console.log(
        "🚀 ~ file: index.jsx:44 ~ useEffect ~ userIndex:",
        userIndex
      );
      const slicedArray = sortedArray.slice(0, 10);

      setData(slicedArray);
      setFlag(false);
    }
  }, [data, flag]);

  if (!data && !flag) {
    return (
      <ImageBackground
        resizeMode="repeat"
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
        source={require("../../assets/imageBackground.png")}
      ></ImageBackground>
    );
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
        <InputLabel>Resultado</InputLabel>
        <InputLabel>Nivel: {user.option}</InputLabel>
        <TextQuestion>
          {position + 1}º posição Seus acertos {finallyResult.correct}/
          {user.questions}
        </TextQuestion>
        <ViewList>
          {data &&
            Object.keys(data).map((index) => {
              return (
                <ViewItemList key={index}>
                  <TextPoints>{data[index]?.name}</TextPoints>
                  <TextPoints>
                    {data[index]?.correct}/{user.questions}
                  </TextPoints>
                </ViewItemList>
              );
            })}
        </ViewList>
        <ViewButton>
          <ButtonText>Play Again</ButtonText>
        </ViewButton>
      </ViewMain>
    </ImageBackground>
  );
};
export default Result;

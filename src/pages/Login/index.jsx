import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";
import {
  ViewButton,
  Input,
  InputContainer,
  InputLabel,
  ButtonText,
  ViewMain,
  ViewInputs,
  SelectContainer,
  ViewSelect,
  ViewSelectOff,
  TextSelect,
  ViewSelectOptionsQuantity,
  ViewOptionsQuantity,
  ViewButtonOff,
} from "./style";
import { addNewUser } from "../../services/user";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../../contexts/user";
import { QuestionsrContext } from "../../contexts/questions";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState();
  const { createUser, user } = useContext(UserContext);
  const { getQuestions } = useContext(QuestionsrContext);

  const reset = () => {
    setName("");
    setEmail("");
    setSelectedQuantity();
    setSelectedOption();
  };

  useFocusEffect(
    useCallback(() => {
      reset();
    }, [])
  );

  const { navigate } = useNavigation();
  const options = [
    { label: "Easy", value: "easy", icon: "robot-happy", color: "#0f0" },
    { label: "Medium", value: "medium", icon: "robot", color: "#FFEB3B" },
    { label: "Hard", value: "hard", icon: "robot-angry", color: "#F00" },
  ];
  const optionsQuantity = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];
  const initGame = () => {
    addNewUser({ name, email });
    getQuestions(selectedQuantity, selectedOption);
    createUser({
      name,
      email,
      questions: selectedQuantity,
      option: selectedOption,
    });
    navigate("Questions");
  };

  const ValidateCamps = useMemo(() => {
    if (name && email && selectedOption && selectedQuantity) {
      return true;
    }
    return false;
  }, [name && email && selectedOption && selectedQuantity]);

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
        <Image
          source={require("../../assets/Vector.png")}
          style={{ width: "38%", height: 175, marginLeft: "5%" }}
        />
        <ViewInputs>
          <InputLabel>Nome</InputLabel>
          <InputContainer>
            <Input
              value={name}
              placeholder="Nome"
              onChangeText={(val) => setName(val)}
            />
          </InputContainer>
          <InputLabel>E-mail</InputLabel>
          <InputContainer>
            <Input
              value={email}
              placeholder="E-mail"
              onChangeText={(val) => setEmail(val)}
            />
          </InputContainer>
          <SelectContainer>
            <View>
              <InputLabel>Selecione a dificuldade:</InputLabel>
              {options.map((option) => (
                <>
                  {selectedOption === option.value ? (
                    <ViewSelect color={option.color} key={option.value}>
                      <TextSelect>{option.label}</TextSelect>
                      <MaterialCommunityIcons
                        name={option.icon}
                        size={24}
                        color="white"
                      />
                    </ViewSelect>
                  ) : (
                    <ViewSelectOff
                      key={option.value}
                      onPress={() => setSelectedOption(option.value)}
                    >
                      <TextSelect>{option.label}</TextSelect>
                    </ViewSelectOff>
                  )}
                </>
              ))}
            </View>
          </SelectContainer>
          <SelectContainer>
            <InputLabel>Selecione a dificuldade:</InputLabel>
            <ViewSelectOptionsQuantity>
              {optionsQuantity.map((option) => (
                <>
                  {selectedQuantity === option.value ? (
                    <ViewOptionsQuantity color>
                      <Text>{option.label}</Text>
                    </ViewOptionsQuantity>
                  ) : (
                    <ViewOptionsQuantity
                      onPress={() => setSelectedQuantity(option.value)}
                    >
                      <Text>{option.label}</Text>
                    </ViewOptionsQuantity>
                  )}
                </>
              ))}
            </ViewSelectOptionsQuantity>
          </SelectContainer>
        </ViewInputs>

        {ValidateCamps ? (
          <ViewButton onPress={() => initGame()}>
            <ButtonText>Start</ButtonText>
          </ViewButton>
        ) : (
          <ViewButtonOff>
            <ButtonText>Start</ButtonText>
          </ViewButtonOff>
        )}
      </ViewMain>
    </ImageBackground>
  );
};
export default Login;

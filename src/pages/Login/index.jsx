import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
} from "./style";
import { addNewUser, teste } from "../../services/user";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState();
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
            <Input placeholder="Nome" />
          </InputContainer>
          <InputLabel>E-mail</InputLabel>
          <InputContainer>
            <Input placeholder="E-mail" />
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
        <ViewButton
          onPress={() => teste({ name: "toby", email: "toby@gmail.com" })}
        >
          <ButtonText>Start</ButtonText>
        </ViewButton>
      </ViewMain>
    </ImageBackground>
  );
};
export default Login;

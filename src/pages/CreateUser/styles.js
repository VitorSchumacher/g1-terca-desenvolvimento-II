import styled from "styled-components/native";
import { Text, View, SafeAreaView, ScrollView } from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding-top: 50%;
`;

export const ScrollViewContent = styled(ScrollView)`
  padding: 20px;
`;

export const FormArea = styled.View`
  padding: 18px;
  margin-bottom: 8px;
`;

export const Header = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 12px 0;
  margin-bottom: 5px;
  color: #000; /* Cor de texto padrão */
`;

export const InputContainer = styled(View)`
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Label = styled(Text)`
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #000; /* Cor de texto padrão */
`;

export const ErrorText = styled(Text)`
  color: #ff0000; /* Cor para mensagens de erro */
  font-size: 14px;
  margin-top: 5px;
`;

export const StyledSwitch = styled.Switch`
  width: 40px;
  height: 40px;
`;

export const Button = styled.TouchableOpacity`
  background-color: green;
  width: 100%;
  height: 45px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  background-color: #68B2F8D9;
  elevation: 3;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ViewSingIn = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20%;
  margin-top: 2%;
`

export const TextMain = styled.Text`
  font-size: 20px;
`
export const TextSingIn = styled(TextMain)`
  color: #68B2F8;
  margin-left: 5px;
`
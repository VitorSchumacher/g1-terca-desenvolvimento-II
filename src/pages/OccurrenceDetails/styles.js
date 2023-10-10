import styled from "styled-components/native";
import { ScrollView } from "react-native";
export const Main = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
`;

export const Container = styled(Main)`
  align-items: flex-start;
`;

export const HeaderWrapper = styled.View`
  background-color: #68b2f8;
  width: 100%;
  elevation: 5;
  height: 18%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 5%;
`;

export const MainHeader = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding: 12px 0;
  margin-bottom: 5px;
  color: #fff;
`;

export const ScrollViewContent = styled(ScrollView)`
  padding-top: 5%;
`;

export const Card = styled.View`
  background-color: rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  elevation: 4;
  margin-top: 10%;
  margin-bottom: 24px;
  padding-bottom: 20%;
  padding-left: 16px;
  padding-right: 16px;
  z-index: 10;
  height: 540px;
  width: 90%;
  justify-content: center;
  align-content: center;
`;

export const PerfilImage = styled.Image`
  width: 130px;
  height: 130px;
  align-self: center;
  border-radius: 70px;
`;

export const Label = styled.Text`
  font-size: 14px;
  text-align: left;
  font-weight: 500;
  margin-bottom: 4px;
  color: #000;
  margin-bottom: 3%;
`;

export const Text = styled.Text`
  font-size: 14px;
  text-align: left;
  font-weight: 400;
  color: #000;
  margin-bottom: 5%;
`;

export const TextDescription = styled(Text)`
  border: 1px solid #68b2f8;
  width: 100%;
  padding: 3% 2%;
  border-radius: 4px;
`;

export const TextBlue = styled(TextDescription)`
  background-color: #68b2f8;
  text-align: center;
  color: #fff;
  font-weight: 600;
`;

export const Button = styled.TouchableOpacity`
  width: 240px;
  padding: 16px;
  border-radius: 12px;
  background-color: #68b2f8;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
`;

export const Titulo = styled.Text`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const Botao = styled.TouchableOpacity`
  background-color: #68b2f8;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const BotaoTexto = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const MainButtons = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5% 0;
`;

export const ModalContainer = styled.Modal``;

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro semi-transparente */
`;

export const ModalContent = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #68b2f8;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const ModalButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

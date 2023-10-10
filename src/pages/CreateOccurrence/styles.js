import styled from "styled-components/native";

export const AppContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const ScrollContent = styled.ScrollView``;

export const FormWrapper = styled.View`
  padding: 18px;
  border-width: 1px;
  border-color: #fff;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const HeaderWrapper = styled.View`
  background-color: #68B2F8;
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

export const InputBlock = styled.View`
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

export const InputLabel = styled.Text`
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #000;
`;

export const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
`;

export const StyledSwitch = styled.Switch`
  width: 40px;
  height: 40px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: #68B2F8;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const ButtonLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const MessageText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4%;
`;

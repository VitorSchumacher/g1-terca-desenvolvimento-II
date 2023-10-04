import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #FFF;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 25px;
  width: 80%;
  height: 350px;
`;

export const AreaInput = styled.View`
  flex-direction: row;
  width: 90%;
`;

export const Input = styled.TextInput`
  background-color: #FFF;
  width: 100%;
  font-size: 17px;
  padding: 10px 0;
  color: #121212;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #000;
`;


export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: #68B2F8;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #171717;
`;

// styles.js
import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #f7e3e8; /* Cor de fundo rosa claro */
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
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
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: #ff69b4;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  padding: 0 10px;
  color: #ff69b4; 
  background-color: #fff;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: #ff69b4; 
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff; 
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const LinkText = styled.Text`
  color: #4b0082; /* Cor roxa escura */
  font-size: 16px;
  font-weight: bold;
`;

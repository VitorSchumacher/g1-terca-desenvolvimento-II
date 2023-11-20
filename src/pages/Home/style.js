import styled from "styled-components/native";

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


export const Container = styled.View`
  flex: 1;
  background-color: #f7e3e8;
  padding: 15% 3% 0;
`;

export const ViewAbsolute = styled.View`
  position: absolute;
  top: 0;
  padding: 15% 3% 0;
  background-color: rgba(247, 227, 232, 0.8);
  z-index: 99999;
  width: ${width}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ff1493;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: #ff69b4;
  padding: 10px;
  border-radius: 8px;
`;

export const TouchableOpacityText = styled.Text`
  color: #fff; /* Cor branca */
  font-size: 16px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  border: 1px solid #ff69b4;
  border-radius: 8px;
  padding: 0 10px;
  color: #ff69b4; /* Cor verde */
  background-color: rgba(247, 227, 232, 0.8)
`;

// Adicione outros estilos necessários para o seu componente Modal, se necessário

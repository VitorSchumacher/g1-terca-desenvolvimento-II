import styled from "styled-components/native";

export const ViewButton = styled.TouchableOpacity`
  background-color: #6949fd;
  width: auto;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const ViewButtonOff = styled(ViewButton)`
  background-color: #ccc;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 32px;
  margin: 10px 20px;
`;

export const InputLabel = styled.Text`
  color: #fff;
  font-size: 32px;
`;

export const InputContainer = styled.View`
  margin: 10px 0;
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid #6949fd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  background-color: #6949fd33;
  color: #fff;
`;

export const ViewMain = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 5%;
`;

export const ViewInputs = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const SelectContainer = styled.View`
  border-radius: 5px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const ViewSelect = styled.View`
  background-color: ${(params) => (params.color ? params.color : null)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 5px;
`;

export const ViewSelectOff = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 5px;
`;

export const TextSelect = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 2% 0;
`;

export const ViewSelectOptionsQuantity = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 3%;
`;

export const ViewOptionsQuantity = styled.TouchableOpacity`
  background-color: ${(params) => (params.color ? "#0f0" : "#ccc")};
  padding: 5% 4%;
  border-radius: 5px;
`;

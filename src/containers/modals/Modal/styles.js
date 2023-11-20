import styled from "styled-components/native";

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  background-color: ${(props) => (props.color ? props.color : "#fff")};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  width: 80%;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const EditInput = styled.TextInput`
  height: 40px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
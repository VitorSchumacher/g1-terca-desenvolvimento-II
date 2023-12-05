import styled from "styled-components/native";

export const ViewMain = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10% 5%;
`;
export const InputLabel = styled.Text`
  color: #fff;
  font-size: 32px;
  margin-top: 10%;
`;

export const TextQuestion = styled.Text`
  color: #38e9bb;
  font-size: 24px;
  text-align: center;
  margin-top: 10%;
`;
export const ViewQuestions = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 10%;
`;
export const TouchableQuestion = styled.TouchableOpacity`
  background-color: #6949fd;
  width: 100%;
  align-items: center;
  border-radius: 10px;
`;

export const TextQuestionAlter = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  padding: 3% 2%;
`;

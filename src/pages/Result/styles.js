import styled from "styled-components/native";

export const ViewMain = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 5%;
`;

export const InputLabel = styled.Text`
  color: #fff;
  font-size: 32px;
`;

export const TextQuestion = styled.Text`
  color: #38e9bb;
  font-size: 24px;
  text-align: center;
`;
export const ViewList = styled.View`
  width: 100%;
  margin: 5% 0;
`;
export const ViewItemList = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 1% 0;
`;

export const TextPoints = styled.Text`
  color: #38e9bb;
  font-size: 16px;
`;


export const ViewButton = styled.TouchableOpacity`
  background-color: #6949fd;
  width: auto;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 32px;
  margin: 10px 20px;
`;
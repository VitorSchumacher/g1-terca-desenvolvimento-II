import styled from "styled-components/native";

export const Main = styled.View`
  border: 1px solid #68b2f8;
  padding: 10px;
  margin: 5% 5% 0;
  border-radius: 12px;
  elevation: 5;
  background-color: #fff;
`;

export const ViewLine = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 6%;
`;

export const ViewColumn = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const TetxTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const TextTitleItem = styled(TetxTitle)`
  font-size: 14px;
`;

export const ViewBlue = styled.View`
    background-color: #68B2F8;
    min-width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    margin-top: 5px;
    border-radius: 3px;
`;

import styled from 'styled-components/native';

export const Main = styled.View`
    background-color: #68B2F8;
    width: 100%;
    elevation: 5;
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5%;

`
export const Logo = styled.Image`
  width: 13%;
  height: 60%;
  min-height: 60px;
`;

export const ViewItens = styled.View`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
`
export const TextTitle = styled.Text`
    color: #fff;
    font-size: 24px;
    margin-bottom: 3%;
`
export const Button = styled.TouchableOpacity`
    border-radius: 5px;
    border: 1px solid #fff;
    padding: 1px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3%;
`
export const TextButton = styled.Text`
    color: #fff;
    font-size: 14px;
`
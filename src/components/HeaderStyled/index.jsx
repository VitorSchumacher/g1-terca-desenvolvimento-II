import { View } from "react-native";
import styled from "styled-components";
import LogoImg from "../../assets/RectangleHeader.png";

const HeaderStyled = ({title, subTitle}) => {
  return (
    <ViewAbsolute>
      <View>
        <TextTitle>{title}</TextTitle>
        <TextSubtitle>{subTitle}</TextSubtitle>
      </View>
      <Logo source={LogoImg} />
    </ViewAbsolute>
  );
};
export default HeaderStyled;

const ViewAbsolute = styled(View)`
  width: 100%;
  position: absolute;
  top: 40px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  height: 90px;
`;

const Logo = styled.Image`
  width: 100%;
  position: absolute;
  height: 290px;
`;

const TextTitle = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  z-index: 9;
  margin-left: 20%;
`;
const TextSubtitle = styled(TextTitle)`
  font-size: 22px;
  font-weight: 400;
`;

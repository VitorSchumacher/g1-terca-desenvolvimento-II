import { Text, View } from "react-native";
import { Button, Logo, Main, TextButton, TextTitle, ViewItens } from "./style";
import LogoImg from "../../assets/location.png";

const HeaderHome = ({onPress}) => {
  return (
    <Main>
      <Logo source={LogoImg} />
      <ViewItens>
        <TextTitle>Ocorrências perto de você</TextTitle>
        <Button onPress={onPress}>
          <TextButton>Nova Ocorrência</TextButton>
        </Button>
      </ViewItens>
    </Main>
  );
};

export default HeaderHome;

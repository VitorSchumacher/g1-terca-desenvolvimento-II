import { Text, View } from "react-native";
import {
  Main,
  TetxTitle,
  TextTitleItem,
  ViewBlue,
  ViewColumn,
  ViewLine,
} from "./styled";

const CardHome = ({ data }) => {
  console.log(data);
  const dateObj = new Date(data.created_at);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Os meses começam em 0
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <Main>
      <ViewLine>
        <TetxTitle>{data.title}</TetxTitle>
        <TetxTitle>{formattedDate}</TetxTitle>
      </ViewLine>
      <ViewLine>
        <Text>{data.description}</Text>
      </ViewLine>
      <ViewLine>
        <ViewColumn>
          <TextTitleItem>Categoria</TextTitleItem>
          <ViewBlue>
            <Text>{data.category}</Text>
          </ViewBlue>
        </ViewColumn>
        <ViewColumn>
          <TextTitleItem>Nível de Risco</TextTitleItem>
          <ViewBlue>
            <Text>{data.risk_level}</Text>
          </ViewBlue>
        </ViewColumn>
        <ViewColumn>
          <TextTitleItem>Status</TextTitleItem>
          <ViewBlue>
            <Text>{data.status}</Text>
          </ViewBlue>
        </ViewColumn>
      </ViewLine>
      <ViewLine>
        <Text>Cidade: city fazer lat long</Text>
      </ViewLine>
      <View>
        <Text>Ver detalhes</Text>
      </View>
    </Main>
  );
};

export default CardHome;

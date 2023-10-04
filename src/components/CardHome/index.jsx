import { Text, View } from "react-native";
import { Main, TetxTitle, ViewColumn, ViewLine } from "./styled";

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
          <Text>Categoria</Text>
          <Text>{data.category}</Text>
        </ViewColumn>
        <ViewColumn>
          <Text>Nível de Risco</Text>
          <Text>{data.risk_level}</Text>
        </ViewColumn>
        <ViewColumn>
          <Text>Status</Text>
          <Text>{data.status}</Text>
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

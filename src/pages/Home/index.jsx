import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import HeaderHome from "../../components/HeaderHome";
import { useCallback, useContext, useEffect, useState } from "react";
import { getOccurence } from "../../services/home";
import { AuthContext } from "../../contexts/auth";
import CardHome from "../../components/CardHome";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { navigate } = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [items, setItems] = useState();

  const getData = useCallback(async () => {
    try {
      const { data } = await getOccurence();
      setItems(data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const navigateCreateOccurence = () => {
    navigate("CreateOccurence");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderHome onPress={() => navigateCreateOccurence()} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardHome data={item} />}
          ListFooterComponent={<View style={{ width: 10, height: 20 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

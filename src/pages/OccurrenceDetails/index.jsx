import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { format } from "date-fns";
import api from "../../services/api";
import {
  Container,
  ScrollViewContent,
  Card,
  PerfilImage,
  Label,
  Text as StyledText,
  Button,
  ButtonText,
  Botao,
  BotaoTexto,
  Titulo,
  ModalBackground,
  ModalButton,
  ModalButtonContainer,
  ModalButtonText,
  ModalContainer,
  ModalContent,
  ModalText,
  HeaderWrapper,
  MainHeader,
  MessageText,
  Main,
  TextDescription,
  TextBlue,
  MainButtons,
} from "./styles";
import setTiskLeavel from "../../utils/setRiskLevel";
import LocationPicker from "../../components/Location";
import MapView, { Marker } from "react-native-maps";

const OccurenceDetails = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [occurence, setOccurence] = useState();
  const [loadingOccurence, setLoadingOccurence] = useState(false);

  async function loadOccurence() {
    try {
      setLoadingOccurence(true);
      const response = await api.get(`occurrences/${params?.id}`);
      console.log(response.data);
      setOccurence(response.data.data);
    } catch (error) {
      console.error("Erro ao carregar os usuários:", error);
    } finally {
      setLoadingOccurence(false);
    }
  }

  useEffect(() => {
    console.log(isFocused);
    if (isFocused) {
      loadOccurence();
    }
  }, [isFocused]);

  async function deleteOccurence(id) {
    console.log(id);
    try {
      const token = await AsyncStorage.getItem("@authToken");

      const response = await api.delete(`occurrences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        loadUsers();
        console.log("Ocorrencua deletado com sucesso");
      } else if (response.status === 404) {
        console.error("Ocorrencia não encontrado");
      } else {
        console.error("Erro ao deletar o ocorrencia");
      }
    } catch (error) {
      console.error("Erro ao carregar os ocorrencias:", error);
    }
  }

  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const openConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const confirmDeletion = () => {
    deleteOccurence(route.params?.id);
    closeConfirmationModal();
  };

  if (loadingOccurence) {
    return (
      <Main>
        <ActivityIndicator size={36} color="#000" />
      </Main>
    );
  }

  return (
    <>
      {occurence && (
        <>
          <HeaderWrapper>
            <MainHeader>{occurence.title}</MainHeader>
          </HeaderWrapper>
          <ScrollViewContent>
            <Container>
              <Label>Descrição</Label>
              <TextDescription>{occurence.description}</TextDescription>
              <Label>Categoria</Label>
              <TextBlue>{occurence.category}</TextBlue>
              <Label>Nível de Risco</Label>
              <TextBlue>{setTiskLeavel(occurence.risk_level)}</TextBlue>
              <Label>Status</Label>
              <TextBlue>{occurence.status}</TextBlue>
              <Label>Fotografia da ocorrencia</Label>
              <PerfilImage
                source={{
                  uri: `https://crud-user-mftn.onrender.com/occurrences/image/${params?.id}`,
                }}
              />
              <Label>Localização da ocorrencia</Label>

              <View style={{ width: "100%" }}>
                {occurence && (
                  <MapView
                    style={{ width: "100%", height: 300, marginTop: 12 }}
                    initialRegion={{
                      latitude: parseFloat(occurence.latitude),
                      longitude: parseFloat(occurence.longitude),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: parseFloat(occurence.latitude),
                        longitude: parseFloat(occurence.longitude),
                      }}
                      title="Minha Localização"
                      description="Estou aqui!"
                    />
                  </MapView>
                )}
              </View>
              <MainButtons>
                <Button onPress={openConfirmationModal}>
                  <ButtonText>Excluir</ButtonText>
                </Button>
                <Button onPress={() => navigation.goBack()}>
                  <ButtonText>Lista de Ocorrências</ButtonText>
                </Button>
              </MainButtons>
            </Container>
          </ScrollViewContent>
        </>
      )}

      <ModalContainer
        visible={isConfirmationModalVisible}
        transparent={true}
        animationType="slide"
      >
        <ModalBackground>
          <ModalContent>
            <ModalText>
              Tem certeza de que deseja excluir esta ocorrência?
            </ModalText>
            <ModalButtonContainer>
              <ModalButton onPress={confirmDeletion}>
                <ModalButtonText>Confirmar</ModalButtonText>
              </ModalButton>
              <ModalButton onPress={closeConfirmationModal}>
                <ModalButtonText>Cancelar</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalBackground>
      </ModalContainer>
    </>
  );
};

export default OccurenceDetails;

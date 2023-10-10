import React from "react";
import { Keyboard, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TextInput from "../../components/TextInput";
import { createOccurrenceSchema } from "../../utils/createOccurrenceValidation";
import {
    AppContainer,
    HeaderWrapper,
    MainHeader,
    FormWrapper,
    InputBlock,
    InputLabel,
    ScrollContent,
    SubmitButton,
    ButtonLabel,
    MessageText,
    ErrorText,
    StyledSwitch,
    ButtonsWrapper,
  } from "./styles";
import CategoryPicker from "../../components/CategoryPicker";
import RiskLevelPicker from "../../components/RiskLevelPicker";
import StatusPicker from "../../components/StatusPicker";
import LocationPicker from "../../components/Location";
import { postOccurence } from "../../services/createOccurence";

const defaultValues = {
  title: "",
  description: "",
  category: "",
  risk_level: 1,
  status: "",
  id_user: "",
  latitude: "-29.71143880",
  longitude: "-53.77776160",
  image: "",
  trust_level: null,
};

export default function CreateOccurrence() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createOccurrenceSchema),
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    try {
      const response = await postOccurence(data);
      reset(defaultValues);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao enviar dados:", error.message);
    }
  };

  return (
    <AppContainer>
      <HeaderWrapper>
        <MainHeader>Criar Ocorrência</MainHeader>
        <MessageText>Insira os seus dados</MessageText>
      </HeaderWrapper>
      <ScrollView>
        <FormWrapper>
          <InputBlock>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>TÍTULO</InputLabel>
                  <TextInput
                    name="title"
                    placeholder="DIGITE O TÍTULO"
                    onChange={onChange}
                    value={value}
                    error={errors.title}
                  />
                </>
              )}
              name="title"
            />
          </InputBlock>

          <InputBlock>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>DESCRIÇÃO</InputLabel>
                  <TextInput
                    name="description"
                    placeholder="ESCREVA UM BREVE RESUMO"
                    onChange={onChange}
                    value={value}
                    error={errors.description}
                  />
                </>
              )}
              name="description"
            />
          </InputBlock>

          <InputBlock>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>CATEGORIA</InputLabel>
                  <CategoryPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="category"
            />
          </InputBlock>

          <InputBlock>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>NÍVEL DE RISCO</InputLabel>
                  <RiskLevelPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="risk_level"
            />
          </InputBlock>

          <InputBlock>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <InputLabel>STATUS</InputLabel>
                  <StatusPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="status"
            />
          </InputBlock>
          <InputBlock>
            <InputLabel>LOCALIZAÇÃO</InputLabel>
            <LocationPicker />
          </InputBlock>
        </FormWrapper>
        <ButtonsWrapper>
          <SubmitButton onPress={handleSubmit(onSubmit)}>
            <ButtonLabel>Cadastrar</ButtonLabel>
          </SubmitButton>
          <SubmitButton onPress={() => navigation.goBack()}>
            <ButtonLabel>Lista de Ocorrências</ButtonLabel>
          </SubmitButton>
        </ButtonsWrapper>
      </ScrollView>
    </AppContainer>
  );
}

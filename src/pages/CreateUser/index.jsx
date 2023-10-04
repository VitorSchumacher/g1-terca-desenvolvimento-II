import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

import ImagePicker from "../../components/ImagePicker";
import CityPicker from "../../components/CityPicker";
import DatePicker from "../../components/DatePicker";
import TextInput from "../../components/TextInput";
import { createUserSchema } from "../../utils/createUserValidation";
import { format } from "date-fns";
import api from "../../services/api";

import LogoImg from "../../assets/RectangleHeader.png";

import {
  Container,
  ErrorText,
  Header,
  FormArea,
  InputContainer,
  Label,
  ScrollViewContent,
  StyledSwitch,
  Button,
  ButtonText,
  Logo,
  ViewAbsolute,
  TextTitle,
  ViewAbsoluteText,
  TextSubtitle,
  ViewSingIn,
  TextMain,
  TextSingIn,
} from "./styles";
import HeaderStyled from "../../components/HeaderStyled";

export default function App() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpf: "",
      birth_date: new Date(),
      city: "",
    },
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    try {
      const birthDate = format(new Date(data.birth_date), "yyyy-MM-dd");

      const dataApi = {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        cpf: data.cpf,
        birth_date: birthDate,
        city: data.city,
      };
      console.log(dataApi);

      // Envie os dados para a API
      const dataResponse = await api.post("/users", dataApi);
      console.log(
        "🚀 ~ file: index.jsx:78 ~ onSubmit ~ dataResponse:",
        dataResponse
      );

      // Limpe os campos após o envio bem-sucedido
      reset({
        name: "",
        email: "",
        cpf: "",
        birth_date: new Date(),
        city: "",
      });
      navigation.navigate("SignIn");
    } catch (error) {
      // Lide com erros de envio para a API aqui
      console.error("Erro ao enviar dados:", error.message);
    }
  };

  return (
    <>
      <HeaderStyled subTitle="Insira os dados" title="Criar conta" />
      <Container>
        <ScrollViewContent>
          <FormArea>
            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>Nome completo</Label>
                    <TextInput
                      name="name"
                      placeholder="Digite seu nome"
                      onChange={onChange}
                      value={value}
                      error={errors.name}
                    />
                  </>
                )}
                name="name"
              />
            </InputContainer>

            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>E-mail</Label>
                    <TextInput
                      name="email"
                      placeholder="Digite seu e-mail"
                      onChange={onChange}
                      value={value}
                      error={errors.email}
                    />
                  </>
                )}
                name="email"
              />
            </InputContainer>

            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>CPF</Label>
                    <TextInput
                      name="cpf"
                      placeholder="CPF"
                      onChange={onChange}
                      value={value}
                      error={errors.cpf}
                      keyboardType="numeric"
                    />
                  </>
                )}
                name="cpf"
              />
            </InputContainer>

            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>Data de Nascimento</Label>
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      showPicker={showDatePicker}
                      setShowPicker={setShowDatePicker}
                    />
                    {errors.birth_date && (
                      <ErrorText>{errors.birth_date.message}</ErrorText>
                    )}
                  </>
                )}
                name="birth_date"
              />
            </InputContainer>

            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>Senha</Label>
                    <TextInput
                      name="password"
                      placeholder="Senha"
                      onChange={onChange}
                      value={value}
                      secureTextEntry={true}
                      error={errors.password}
                    />
                  </>
                )}
                name="password"
              />
            </InputContainer>

            <InputContainer>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Label>Cidade</Label>
                    <TextInput
                      name="city"
                      placeholder="Digite sua cidade"
                      onChange={onChange}
                      value={value}
                      error={errors.city}
                    />
                  </>
                )}
                name="city"
              />
            </InputContainer>
          </FormArea>
          <InputContainer>
            <Button onPress={handleSubmit(onSubmit)}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
            <ViewSingIn>
              <TextMain>Já possui uma conta?</TextMain>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <TextSingIn>Login</TextSingIn>
              </TouchableOpacity>
            </ViewSingIn>
          </InputContainer>
        </ScrollViewContent>
      </Container>
    </>
  );
}

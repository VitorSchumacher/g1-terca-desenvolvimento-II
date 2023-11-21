import React, { useState, useContext } from "react";
import { Platform, ActivityIndicator, View, Text } from "react-native";

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
  Label,
} from "./styles";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function logar() {
    signIn(email, password)
    setEmail("");
    setPassword("");
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <View>
          <Label>Email:</Label>
          <AreaInput>
            <Input
              placeholder="Seu email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </AreaInput>
        </View>
        <View>
          <Label>Senha:</Label>
          <AreaInput>
            <Input
              placeholder="Sua senha"
              value={password}
              onChangeText={(text) => setPassword(text.toLowerCase())}
              secureTextEntry={true}
            />
          </AreaInput>
        </View>

        <SubmitButton activeOpacity={0.8} onPress={() => logar()}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Login</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar nova conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}

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
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth"; // Import the necessary Firebase auth functions

import { AuthContext } from "../../contexts/auth";
import { db, app } from "../../firebaseConnection.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app); // Get the Auth object from your Firebase connection

  async function logar() {
    signIn(email, password)
    setEmail("");
    setPassword("");
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <View>
          <Text>Email:</Text>
          <AreaInput>
            <Input
              placeholder="Seu email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </AreaInput>
        </View>
        <View>
          <Text>Senha:</Text>
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

        <Link onPress={() => navigation.navigate("CreateUser")}>
          <LinkText>Criar nova conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}

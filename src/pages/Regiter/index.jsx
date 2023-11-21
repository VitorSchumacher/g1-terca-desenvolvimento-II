import React, { useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Title,
  InputContainer,
  StyledTouchableOpacity,
  TouchableOpacityText,
  Input,
} from "./styles";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../firebaseConnection";

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth(app);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      alert("Usuario criado: " + user.email);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("Sua senha deve ter pelo menos 6 caracteres");
      } else if (error.code === "auth/invalid-email") {
        alert("Email inválido");
      } else {
        alert("Ops, algo deu errado: " + error.message);
      }
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigation.navigate("SignIn");
  };

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>
      <InputContainer>
        <Input
          placeholder="E-mail"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          autoCapitalize="none"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          autoCapitalize="none"
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </InputContainer>
      <StyledTouchableOpacity onPress={handleSignUp}>
        <TouchableOpacityText>Cadastrar</TouchableOpacityText>
      </StyledTouchableOpacity>
    </Container>
  );
};

export default SignUp;

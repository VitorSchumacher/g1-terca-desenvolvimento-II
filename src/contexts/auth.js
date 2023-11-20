import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";

import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebaseConnection";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@userId");
      const storedUserString = await AsyncStorage.getItem("@user");
      if (storageUser) {
        setUser(JSON.parse(storedUserString));
        setLoading(false);
      }
      setLoading(false);
    }
    setLoading(true);
    loadStorage();
  }, [loadingAuth]);

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        alert("Bem-vindo: " + value.user.email);
        setUser(value.user)
        AsyncStorage.setItem("@userId", value.user.uid);
        AsyncStorage.setItem("@user", JSON.stringify(value.user));
      })
      .catch((error) => {
        console.log("ERRO AO LOGAR ", error);
        Alert.alert("E-mail ou senha incorretos!");
        setLoadingAuth(false);
        return;
      });
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
      navigation.navigate("SignIn");
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loadingAuth,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

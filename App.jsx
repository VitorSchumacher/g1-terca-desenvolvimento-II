import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes";
import UserProvider from "./src/contexts/user";
import QuestionsProvider from "./src/contexts/questions";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#68B2F8" />
        <UserProvider>
          <QuestionsProvider>
            <Routes />
          </QuestionsProvider>
        </UserProvider>
    </NavigationContainer>
  );
}

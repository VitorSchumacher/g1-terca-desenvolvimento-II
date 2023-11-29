import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/Login";
import Questions from "../pages/Questions";
import Result from "../pages/Result";

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Questions"
        component={Questions}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Result"
        component={Result}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;

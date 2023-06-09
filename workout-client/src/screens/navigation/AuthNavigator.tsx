import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Success from "../auth/Success";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Login">
      <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
      <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
      <AuthStack.Screen name="Success" component={Success}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

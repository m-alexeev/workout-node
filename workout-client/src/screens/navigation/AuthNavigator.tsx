import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import Login from "../auth/Login";
import Register from "../auth/Register";
import RegistrationSuccess from "../auth/RegistrationSuccess";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
      <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
      <AuthStack.Screen name="Success" component={RegistrationSuccess}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AuthStackParamList,
  ExerciseStackParamList,
} from "../../types/navigation";
import ExerciseTabNavigator from "./ExerciseNavigator";
import ExerciseScreen from "../bottomTabs/ExercisesList";

const ExerciseStack = createNativeStackNavigator<ExerciseStackParamList>();

const ExerciseStackNavigator = () => {
  return (
    <ExerciseStack.Navigator initialRouteName="ExerciseList">
      <ExerciseStack.Screen
        options={{ headerShown: false }}
        name="ExerciseList"
        component={ExerciseScreen}
      ></ExerciseStack.Screen>
      <ExerciseStack.Screen
        name="Exercise"
        component={ExerciseTabNavigator}
      ></ExerciseStack.Screen>
    </ExerciseStack.Navigator>
  );
};

export default ExerciseStackNavigator;

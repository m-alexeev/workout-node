import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ExerciseTabParamList } from "../../types/navigation";
import ExerciseAbout from "../exercises/ExerciseAbout";
import ExerciseHistory from "../exercises/ExerciseHistory";
import ExerciseCharts from "../exercises/ExerciseCharts";
import ExerciseRecords from "../exercises/ExerciseRecords";

const ExerciseTab = createMaterialTopTabNavigator<ExerciseTabParamList>();

const ExerciseTabNavigator = () => {
  return (
    <ExerciseTab.Navigator>
      <ExerciseTab.Screen
        name="About"
        options={{ tabBarLabel: "About" }}
        component={ExerciseAbout}
      ></ExerciseTab.Screen>
      <ExerciseTab.Screen
        name="History"
        component={ExerciseHistory}
      ></ExerciseTab.Screen>
      <ExerciseTab.Screen
        name="Charts"
        component={ExerciseCharts}
      ></ExerciseTab.Screen>
      <ExerciseTab.Screen
        name="Records"
        component={ExerciseRecords}
      ></ExerciseTab.Screen>
    </ExerciseTab.Navigator>
  );
};

export default ExerciseTabNavigator;

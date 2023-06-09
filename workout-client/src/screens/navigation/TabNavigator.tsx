import React from "react";
import { useAuth } from "../../contexts/auth";
import { useTheme } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../../types/navigation";
import DashboardScreen from "../bottomTabs/DashboardScreen";
import WorkoutScreen from "../bottomTabs/WorkoutScreen";
import ExerciseScreen from "../bottomTabs/ExercisesList";
import HistoryScreen from "../bottomTabs/HistoryScreen";
import ProfileScreen from "../bottomTabs/ProfileScreen";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import ExerciseStackNavigator from "./ExerciseStackNavigator";

const BottomTabNavigator = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const theme = useTheme();

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          paddingBottom: 3,
        },
        headerShown: false,
      }}
    >
      <BottomTabNavigator.Screen
        options={{
          tabBarIcon: ({color, size }) => (
            <Icon name="home" size={size} color={color}></Icon>
          ),
        }}
        name="Dashboard"
        component={DashboardScreen}
      />
      <BottomTabNavigator.Screen
        name="Exercises"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="dumbbell" size={size} color={color}></Icon>
          ),
        }}
        component={ExerciseStackNavigator}
      />
      <BottomTabNavigator.Screen
        name="History"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock-outline" size={size} color={color}></Icon>
          ),
        }}
        component={HistoryScreen}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-outline" size={size} color={color}></Icon>
          ),
        }}
        component={ProfileScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default TabNavigator;

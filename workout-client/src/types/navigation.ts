import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  AuthRoute: undefined;
  MainRoute: NavigatorScreenParams<MainTabParamList>;
}

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
}

export type MainTabParamList = {
  Dashboard: undefined;
  Exercises: undefined;
  History: undefined;
  Profile: undefined;
  Workout: undefined;
}


export type DashboardStackParamList = {
  Dashboard: undefined;
};

export type ExerciseStackParamList = {
  Exercises: undefined;
};

export type HistoryStackParamList = {
  History: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type WorkoutStackParamList = {
  Workout: undefined;
};
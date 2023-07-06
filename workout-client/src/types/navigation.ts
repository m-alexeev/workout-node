import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  AuthRoute: undefined;
  MainRoute: NavigatorScreenParams<MainTabParamList>;
}

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
  Success: undefined;
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
  ExerciseList: undefined;
  Exercise: {exerciseID: string};
};

export type ExerciseTabParamList = {
  About: {exerciseID: string};
  Records: {exerciseID: string};
  Charts: {exerciseID: string};
  History: {exerciseID: string};
}

export type HistoryStackParamList = {
  History: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type WorkoutStackParamList = {
  Workout: undefined;
};
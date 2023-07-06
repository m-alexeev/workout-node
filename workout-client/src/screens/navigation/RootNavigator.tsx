import { useAuth } from "../../contexts/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../SplashScreen";
import AuthNavigator from "./AuthNavigator";
import { View, Text } from "react-native";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { authState } = useAuth();

  if (authState?.isRehydrating) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {authState?.user === null ? (
        <RootStack.Screen name="AuthRoute" component={AuthNavigator}></RootStack.Screen>
      ) : (
        <RootStack.Screen name="MainRoute" component={TabNavigator}></RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;

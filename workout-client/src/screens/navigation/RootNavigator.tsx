import { useAuth } from "../../contexts/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import MainScreen from "../MainScreen";
import SplashScreen from "../SplashScreen";
import AuthNavigator from "./AuthNavigator";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { authState } = useAuth();

  //TODO: Add font loading check
  if (authState?.isLoading) {
    return <SplashScreen/>;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown:false}}>
      {authState?.token === null ? (
        <RootStack.Screen name="AuthRoute" component={AuthNavigator}></RootStack.Screen>
      ) : (
        <RootStack.Screen name="MainRoute" component={MainScreen}></RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;

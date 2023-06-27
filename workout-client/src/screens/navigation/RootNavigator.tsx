import { useAuth } from "../../contexts/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import MainNavigator from "../MainNavigator";
import SplashScreen from "../SplashScreen";
import AuthNavigator from "./AuthNavigator";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { authState } = useAuth();

  //TODO: Add font loading check
  if (authState?.isRehydrating) {
    return <SplashScreen/>;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown:false}}>
      {authState?.user === null ? (
        <RootStack.Screen name="AuthRoute" component={AuthNavigator}></RootStack.Screen>
      ) : (
        <RootStack.Screen name="MainRoute" component={MainNavigator}></RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;

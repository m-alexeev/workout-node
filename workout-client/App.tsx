import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { MaterialDarkTheme } from "./src/theme/colors";
import { AuthProvider } from "./src/contexts/auth";
import { ThemeProvider } from "./src/contexts/theme";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/screens/navigation/RootNavigator";

export default function App() {
  const theme = useTheme();
  return (
    <PaperProvider theme={MaterialDarkTheme}>
      <NavigationContainer>
        <ThemeProvider>
          <AuthProvider>
            <RootNavigator/>
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

import { Provider as PaperProvider } from "react-native-paper";
import { MaterialDarkTheme } from "./src/theme/colors";
import { AuthProvider } from "./src/contexts/auth";
import { ThemeProvider } from "./src/contexts/theme";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/screens/navigation/RootNavigator";
import { ConfigProvider } from "./src/contexts/config";
import { FilterProvider } from "./src/contexts/filter";

export default function App() {
  return (
    <PaperProvider theme={MaterialDarkTheme}>
      <NavigationContainer>
        <ThemeProvider>
          <ConfigProvider>
            <AuthProvider>
              <FilterProvider>
              <RootNavigator />
              </FilterProvider>
            </AuthProvider>
          </ConfigProvider>
        </ThemeProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

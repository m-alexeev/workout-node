import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CustomDarkTheme,
  CustomLightTheme,
  IThemeInterface,
} from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage/";

export interface IThemeContextInterface {
  theme: IThemeInterface;
  isLoadingTheme: boolean;
  updateTheme: (currentTheme: "light" | "dark") => void;
}

interface ThemeProps {
  children: ReactNode;
}

const ThemeContext = createContext<IThemeContextInterface | null>(null);

const ThemeProvider: FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState<IThemeInterface>(CustomDarkTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const getSavedTheme = async () => {
    const themeMode = await AsyncStorage.getItem("theme");
    if (themeMode !== null) {
      themeMode === "light"
        ? setTheme(CustomLightTheme)
        : setTheme(CustomDarkTheme);
    }
    setIsLoadingTheme(false);
  };

  useEffect(() => {
    getSavedTheme();
  }, []);

  const updateTheme = async (currentThemeMode: "light" | "dark") => {
    const newTheme =
      currentThemeMode === "light" ? CustomLightTheme : CustomLightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme.mode ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext) as IThemeContextInterface;

export { ThemeProvider, ThemeContext };

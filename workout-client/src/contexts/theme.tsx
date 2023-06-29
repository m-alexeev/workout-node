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
import * as SecureStore from "expo-secure-store";

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
    const themeMode = await SecureStore.getItemAsync("theme");
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

  const updateTheme = (currentThemeMode: "light" | "dark") => {
    const newTheme =
      currentThemeMode === "light" ? CustomLightTheme : CustomLightTheme;
    setTheme(newTheme);
    SecureStore.setItemAsync("theme", newTheme.mode ? "dark" : "light");
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

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {LocalAuthType, LocalUser } from "../types/auth";

const USER_KEY = "user";

interface AuthProps {
  authState?: LocalAuthType;
  onRegister?: (credentials: LocalUser) => Promise<any>;
  ResetUserTemp?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<LocalAuthType>({
    user: null,
    isLoading: false,
    isRehydrating: false,
  });

  useEffect(() => {
    const loadUser = async () => {
      setAuthState({ ...authState, isRehydrating: true });
      const user = await SecureStore.getItemAsync(USER_KEY);
      setAuthState({ ...authState, isRehydrating: false });

      if (user) {
        const decodedUser = JSON.parse(user);
        setAuthState({ ...authState, user: decodedUser });
      }
    };

    loadUser();
  }, []);

  const ResetUserTemp = async() =>  {
   await SecureStore.deleteItemAsync("user");
    setAuthState({...authState, user: null});
  }

  const LocalRegister = async (credentials: LocalUser) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(credentials));
      setAuthState({ ...authState, isLoading: false, user: credentials });
    } catch (err: any) {
      return { error: true, message: err };
    }
  };

  const value = {
    onRegister: LocalRegister,
    ResetUserTemp: ResetUserTemp,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

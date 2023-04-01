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
import { AuthType, JWTType, LoginType, RegisterType } from "../types/api/auth";

interface AuthProps {
  authState?: AuthType;
  onRegister?: (credentials: RegisterType) => Promise<any>;
  onLogin?: (credentials: LoginType) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "jwt";
export const API_URL = "http://localhost:8000/";
const AuthContext = createContext<AuthProps>({});

const parseJWT = (jwt: string): JWTType => {
  return JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString());
};

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthType>({
    token: null,
    authenticated: null,
    isLoading: false,
    isRehydrating: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      setAuthState({ ...authState, isRehydrating: true });
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setAuthState({ ...authState, isLoading: false });
      if (token) {
        // Check if token expired
        const decodedToken = parseJWT(token);
        if (Date.now() < decodedToken.exp * 1000) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            ...authState,
            token: token,
            authenticated: true,
            isRehydrating: false,
          });
        }
      }
    };
    loadToken();
  }, []);

  const register = async (credentials: RegisterType) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      const res = await axios.post(`${API_URL}/api/v1/users/auth/register`, {
        ...credentials,
      });
      setAuthState({ ...authState, isLoading: false });
      return res;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        return { error: true, message: err.message };
      } else {
        return { error: true, message: err.response.data.message };
      }
    }
  };

  const login = async (credentials: LoginType) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      const res = await axios.post(`${API_URL}/api/v1/users/auth/login`, {
        ...credentials,
      });
      setAuthState({
        token: res.data.token,
        authenticated: true,
        isLoading: false,
        isRehydrating: false,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      console.log(res.data.token);
      await SecureStore.setItemAsync(TOKEN_KEY, res.data.token);
      return res;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        return { error: true, message: err.message };
      } else {
        return { error: true, message: err.response.data.message };
      }
    }
  };

  const logout = async () => {
    setAuthState({ ...authState, isLoading: true });
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: null,
      isLoading: false,
      isRehydrating: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

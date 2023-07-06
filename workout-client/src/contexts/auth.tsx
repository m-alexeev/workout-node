import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { LocalAuthType, UserCredentials } from "../types/contexts";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserInfo } from "firebase/auth";

interface AuthProps {
  authState?: LocalAuthType;
  onRegister?: (credentials: UserCredentials) => Promise<any>;
  onSignIn?: (credentials: UserCredentials) => Promise<any>;
  onSignOut?: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>({});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<LocalAuthType>({
    user: null,
    isLoading: false,
    isRehydrating: false,
  });

  const onAuthStateChanged = (user: User | null): any => {
    if (user) {
      setAuthState({ ...authState, user: user, isRehydrating: false });
    }else{
      setAuthState({...authState, user: null, isRehydrating: false});
    }
  };

  useEffect(() => {
    setAuthState({ ...authState, isRehydrating: true });
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const Register = async (user: UserCredentials) => {
    try {
      setAuthState({ ...authState, isLoading: true });
      // create user with Creds
      const firebaseUser = (await createUserWithEmailAndPassword(auth, user.email, user.password)).user;
      setAuthState({ ...authState, isLoading: false, user: firebaseUser });
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  };

  const SignIn = async (user: UserCredentials) => {
    try {
      setAuthState({...authState, isLoading: true});
      const firebaseUser = (await signInWithEmailAndPassword(auth, user.email, user.password)).user;
      setAuthState({...authState, isLoading: false, user: firebaseUser});
    }catch (err: any){
      return { error: true, message: err.message };
    }
  }

  const SignOut = async () => {
    await auth.signOut();
  };

  const value = {
    authState,
    onRegister: Register,
    onSignIn: SignIn,
    onSignOut: SignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthProps;
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider };

import { login, register } from "@/services/auth.service";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      // decode token
      const decoded = jwtDecode<DecodedTokenProps>(token);
      console.log(decoded);
      setUser(decoded.user as UserProps);
    }
  };
  const signIn = async (email: string, password: string) => {
    const res = await login(email, password);
    await updateToken(res.token);
    router.replace("/(main)/home");
  };
  const signUp = async (
    email: string,
    password: string,
    username: string,
    avatar?: string | null
  ) => {
    const res = await register(email, password, username, avatar);
    await updateToken(res.token);
    router.replace("/(main)/home");
  };
  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/welcome");
  };
  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signOut, signUp, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { login, register } from "@/services/auth.service";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import { useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { connectSocket, disconnectSocket } from "@/socket/socket";

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
  useEffect(() => {
    loadToken();
  }, []);
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          await AsyncStorage.removeItem("token");
          goToHomePage();
          return;
        }
        setToken(storedToken);
        await connectSocket();
        setUser(decoded.user);
        goToHomePage();
      } catch (error) {
        goToWelcomePage();
        console.log(`faild to decode the token`);
      }
    } else {
      goToWelcomePage();
    }
  };
  const goToWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  };
  const goToHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 1500);
  };
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
    await connectSocket();
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
    await connectSocket();
    router.replace("/(main)/home");
  };
  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    disconnectSocket();

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

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "../models/User";
import { AuthResponse, LoginData, RegisterData } from "../types";
import * as auth from "../api/auth";
import * as profile from "../api/profile";
type AuthContextType = {
  user: User | null;
  token: string | null;
  loadOrSaveToken: (callback: (() => Promise<AuthResponse>) | null) => void;
  register: (user: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  updateProfileImage: (image: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loadOrSaveToken = async (
    callback: (() => Promise<AuthResponse>) | null
  ) => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setToken(token);
    } else {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (callback != null) {
        const { token, user } = await callback();
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
      }
    }
  };

  const register = async (user: RegisterData) => {
    return loadOrSaveToken(async () => await auth.register(user));
  };

  const login = async (data: LoginData) => {
    return loadOrSaveToken(async () => await auth.login(data));
  };

  const updateProfileImage = async (image: string) => {
    const res = await profile.updateProfileImage(image);
    setUser({
      ...user!,
      profileImage: res.profileImage,
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    token,
    register,
    login,
    logout,
    loadOrSaveToken,
    updateProfileImage,
  };

  useEffect(() => {
    loadOrSaveToken(null);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

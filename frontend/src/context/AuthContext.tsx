import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/authApi";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

interface AuthContextValue {
  user: CurrentUserResponse | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  register: (request: RegisterRequest) => Promise<RegisterResponse>;
  login: (request: LoginRequest) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken")
  );
  const [loading, setLoading] = useState(true);

  const isAuthenticated = token !== null && user !== null;

  useEffect(() => {
    async function loadCurrentUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadCurrentUser();
  }, [token]);

  async function register(
    request: RegisterRequest
  ): Promise<RegisterResponse> {
    return registerUser(request);
  }

  async function login(request: LoginRequest): Promise<AuthResponse> {
    const response = await loginUser(request);

    localStorage.setItem("authToken", response.token);

    setToken(response.token);
    setUser({
      id: response.userId,
      username: response.username,
      email: response.email,
      role: response.role,
    });

    setLoading(false);

    return response;
  }

  function logout() {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
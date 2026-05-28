export type UserRole = "USER" | "ADMIN";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface CurrentUserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
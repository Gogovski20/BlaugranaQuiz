import { apiClient } from "./apiClient";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

export async function registerUser(
  request: RegisterRequest
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    request
  );

  return response.data;
}

export async function loginUser(
  request: LoginRequest
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", request);
  return response.data;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await apiClient.get<CurrentUserResponse>("/auth/me");
  return response.data;
}
import api from "@/lib/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  status: string;
}


export type LoginResponse = {
  message: string
} & User;

export const login = async (
  data: LoginRequest
): Promise<void> => {
  await api.post("/auth/login", data);
};

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const refreshToken = async (): Promise<void> => {
  await api.post("/auth/refresh");
};
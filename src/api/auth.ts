import { AuthResponse, LoginData, RegisterData } from "../types";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return (await res.json()) as AuthResponse;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return (await res.json()) as AuthResponse;
};

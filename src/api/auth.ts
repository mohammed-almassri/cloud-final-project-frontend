import APIError from "../errors/APIError";
import { AuthResponse, LoginData, RegisterData } from "../types";
import { API_BASE_URL } from "../util/constants";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await fetch(API_BASE_URL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
      profileImage: data.image64,
    }),
  });

  if (!res.ok) {
    let errorMessage = "An unknown error occurred";
    try {
      const errorResponse = await res.json();
      if (errorResponse && errorResponse.message) {
        errorMessage = errorResponse.message;
      }
    } catch (_) {
      errorMessage = res.statusText || errorMessage;
    }
    throw new APIError(errorMessage, res.status);
  }
  return (await res.json()) as AuthResponse;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await fetch(API_BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = "An unknown error occurred";
    try {
      const errorResponse = await res.json();
      if (errorResponse && errorResponse.message) {
        errorMessage = errorResponse.message;
      }
    } catch (_) {
      errorMessage = res.statusText || errorMessage;
    }
    throw new APIError(errorMessage, res.status);
  }

  return (await res.json()) as AuthResponse;
};

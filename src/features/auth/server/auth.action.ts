"use server";

import { AUTH_ENDPOINTS } from "@/src/config/api";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { User } from "../store/authSlice";

export default async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();
  if (rememberMe) {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days if rememberMe is true, otherwise 1 day
    });
  } else {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
    });
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return token;
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export type AuthState = {
  isAuthenticated: boolean;
  userInfo: null | User;
  error?: string;
};

export async function verifyToken(): Promise<AuthState> {
  const token = await getToken();
  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
      error: "No token found",
    };
  }
  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: AUTH_ENDPOINTS.verifyToken,
      headers: {
        token
      },
    };

    const { data } = await axios.request(options);

    const { name, id, email, role } = data.decoded;

    if (data.message === "verified") {
      return {
        isAuthenticated: true,
        userInfo: { name, id, email, role },
      };
    } else {
      return {
        isAuthenticated: false,
        userInfo: null,
        error: "Token verification failed",
      };
    }
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
      error: "Error verifying token",
    };
  }
}

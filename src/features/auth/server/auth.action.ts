"use server";

import { cookies } from "next/headers";

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

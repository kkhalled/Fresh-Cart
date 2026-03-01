"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import setToken from "../../auth/server/auth.action";
import { USER_ENDPOINTS } from "@/src/config/api";
import type {
  BackendUpdateMeResponse,
  BackendChangePasswordResponse,
  UpdateProfileInputValues,
  ChangePasswordInputValues,
} from "../types/account.types";

/* ═══════════════════════════════════════════════════════════════════════════
   account.server.ts
   Server-side API layer for account management — only Axios calls, no Redux.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Update User Profile ───────────────────────────────────────────────── */

export async function updateUserProfile(
  values: UpdateProfileInputValues
): Promise<BackendUpdateMeResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: USER_ENDPOINTS.updateMe,
    method: "PUT",
    data: values,
    headers: { token },
  };

  const { data } = await axios.request<BackendUpdateMeResponse>(options);
  return data;
}

/* ── Change User Password ──────────────────────────────────────────────── */

export async function changeUserPassword(
  values: ChangePasswordInputValues
): Promise<BackendChangePasswordResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: USER_ENDPOINTS.changeMyPassword,
    method: "PUT",
    data: values,
    headers: { token },
  };

  const { data } = await axios.request<BackendChangePasswordResponse>(options);

  // Update token after password change
  if (data.token) {
    await setToken(data.token, true);
  }

  return data;
}

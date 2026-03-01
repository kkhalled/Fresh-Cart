"use server";

import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../../auth/server/auth.action";
import setToken from "../../auth/server/auth.action";
import { USER_ENDPOINTS } from "@/src/config/api";
import type {
  ActionResult,
  BackendUpdateMeResponse,
  BackendChangePasswordResponse,
  UpdateProfileInputValues,
  ChangePasswordInputValues,
} from "../types/account.types";

/* ═══════════════════════════════════════════════════════════════════════════
   account.server.ts
   Server-side API layer for account management — only Axios calls, no Redux.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Extract a plain, serializable message from an Axios error while still on
 * the server side (where response.data is accessible).
 */
function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.message === "string" && data.message) return data.message;
    if (error.message) return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/* ── Update User Profile ───────────────────────────────────────────────── */

export async function updateUserProfile(
  values: UpdateProfileInputValues
): Promise<ActionResult<BackendUpdateMeResponse>> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: USER_ENDPOINTS.updateMe,
    method: "PUT",
    data: values,
    headers: { token },
  };

  try {
    const { data } = await axios.request<BackendUpdateMeResponse>(options);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: extractErrorMessage(error, "Failed to update profile") };
  }
}

/* ── Change User Password ──────────────────────────────────────────────── */

export async function changeUserPassword(
  values: ChangePasswordInputValues
): Promise<ActionResult<BackendChangePasswordResponse>> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: USER_ENDPOINTS.changeMyPassword,
    method: "PUT",
    data: values,
    headers: { token },
  };

  try {
    const { data } = await axios.request<BackendChangePasswordResponse>(options);

    if (data.token) {
      await setToken(data.token, true);
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: extractErrorMessage(error, "Failed to change password") };
  }
}

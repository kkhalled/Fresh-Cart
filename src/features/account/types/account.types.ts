/* ═══════════════════════════════════════════════════════════════════════════
   account.types.ts
   Type definitions for account management feature.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Backend Response Types ────────────────────────────────────────────── */

export interface BackendUpdateMeResponse {
  message: string;
  user: {
    name: string;
    email: string;
    phone?: string;
    role: string;
  };
}

export interface BackendChangePasswordResponse {
  message: string;
  token: string;
}

/* ── Form Input Types ──────────────────────────────────────────────────── */

export interface UpdateProfileInputValues {
  name: string;
  email: string;
  phone?: string;
}

export interface ChangePasswordInputValues {
  currentPassword: string;
  password: string;
  rePassword: string;
}

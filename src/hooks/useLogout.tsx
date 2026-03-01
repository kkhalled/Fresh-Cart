"use client";
import { useCallback } from "react";
import { clearToken } from "../features/auth/server/auth.action";
import { setAuthenticated } from "../features/auth/store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
export default function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();
  const logout = useCallback(async () => {
    await clearToken();
    dispatch(setAuthenticated({ isAuthenticated: false, userInfo: null }));
    router.push("/signin");
    router.refresh();
  }, [dispatch, router]);
  return { logout };
}

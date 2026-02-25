"use client";
import { clearToken } from "../features/auth/server/auth.action";
import { setAuthenticated } from "../features/auth/store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
export default function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();
  async function logout() {
    
    await clearToken();
    dispatch(setAuthenticated({ isAuthenticated: false, userInfo: null }));
    router.push("/signin");
    router.refresh();
  }
  return { logout };
}

"use client";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import type { AppState } from "@/src/store/store";

export default function AccountHeader() {
  const { userInfo } = useSelector((state: AppState) => state.auth);

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
            <FontAwesomeIcon icon={faUser} className="w-10 h-10" />
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {userInfo?.name || "User"}
            </h1>
            <div className="flex items-center gap-4 text-primary-100">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                <span className="text-sm">{userInfo?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4" />
                <span className="text-sm capitalize">
                  {userInfo?.role || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-primary-100 mt-1">Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-primary-100 mt-1">Wishlist</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-primary-100 mt-1">Reviews</div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseUnsavedChangesOptions {
  isDirty: boolean;
  enabled?: boolean;
}

export function useUnsavedChanges({ isDirty, enabled = true }: UseUnsavedChangesOptions) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled || !isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, enabled]);

  const confirmNavigation = useCallback(() => {
    if (!isDirty) return true;
    
    return window.confirm(
      "You have unsaved changes. Are you sure you want to leave?"
    );
  }, [isDirty]);

  return { confirmNavigation };
}

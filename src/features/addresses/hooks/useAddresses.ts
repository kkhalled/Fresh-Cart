"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserAddresses, deleteUserAddress } from "../server/address.server";
import type { Address } from "../types/address.types";

/* ═══════════════════════════════════════════════════════════════════════════
   useAddresses Hook
   Manages fetching and deleting user addresses.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getUserAddresses();
      setAddresses(response.data || []);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load addresses";
      toast.error(message);
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      setIsDeleting(addressId);
      await deleteUserAddress(addressId);
      
      // Remove from local state
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
      
      toast.success("Address deleted successfully");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete address";
      toast.error(message);
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    addresses,
    isLoading,
    isDeleting,
    deleteAddress,
    refreshAddresses: fetchAddresses,
  };
}

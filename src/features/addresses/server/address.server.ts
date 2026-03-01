"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { ADDRESS_ENDPOINTS } from "@/src/config/api";
import type {
  AddAddressInput,
  BackendAddAddressResponse,
  BackendGetAddressesResponse,
  BackendDeleteAddressResponse,
} from "../types/address.types";

/* ═══════════════════════════════════════════════════════════════════════════
   Address Server Actions
   Server-side functions for address management.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Get all user addresses
 */
export async function getUserAddresses(): Promise<BackendGetAddressesResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.get<BackendGetAddressesResponse>(
    ADDRESS_ENDPOINTS.addresses,
    {
      headers: {
        token,
      },
    }
  );

  return response.data;
}

/**
 * Add a new address
 */
export async function addUserAddress(
  input: AddAddressInput
): Promise<BackendAddAddressResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.post<BackendAddAddressResponse>(
    ADDRESS_ENDPOINTS.addresses,
    input,
    {
      headers: {
        token,
      },
    }
  );

  return response.data;
}

/**
 * Delete an address
 */
export async function deleteUserAddress(
  addressId: string
): Promise<BackendDeleteAddressResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await axios.delete<BackendDeleteAddressResponse>(
    ADDRESS_ENDPOINTS.addressById(addressId),
    {
      headers: {
        token,
      },
    }
  );

  return response.data;
}

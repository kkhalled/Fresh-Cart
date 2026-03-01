/* ═══════════════════════════════════════════════════════════════════════════
   Address Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface BackendAddAddressResponse {
  status: string;
  message: string;
  data: Address;
}

export interface BackendGetAddressesResponse {
  status: string;
  results: number;
  data: Address[];
}

export interface BackendDeleteAddressResponse {
  status: string;
  message: string;
}

export interface AddAddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

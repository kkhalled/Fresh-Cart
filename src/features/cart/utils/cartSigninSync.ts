import axios from "axios";
import { CART_ENDPOINTS } from "@/src/config/api";
import { fetchCart } from "../store/cart.thunks";
import { clearGuestCart, getGuestCart } from "./guestCart.storage";
import { mapBackendCartToItems } from "./cart.mapper";
import type { AppDispatch } from "@/src/store/store";
import type { BackendGetCartResponse } from "../types/cart.types";

interface SyncCartAfterSigninResult {
  hasGuestItems: boolean;
  mergeHadFailures: boolean;
}

/**
 * Merges guest cart into server cart, then fetches full backend cart
 * into Redux so authenticated UI always uses server data.
 */
export async function syncCartAfterSignin(
  token: string,
  dispatch: AppDispatch,
): Promise<SyncCartAfterSigninResult> {
  const guestItems = getGuestCart();
  const hasGuestItems = guestItems.length > 0;
  let mergeHadFailures = false;

  if (hasGuestItems) {
    // Read current server quantities first so merge is additive.
    const existingCounts = new Map<string, number>();
    try {
      const { data: cartRes } = await axios.get(CART_ENDPOINTS.cart, {
        headers: { token },
      });

      if (cartRes?.data?.products) {
        for (const p of cartRes.data.products) {
          const pid = typeof p.product === "string" ? p.product : p.product._id;
          existingCounts.set(pid, p.count);
        }
      }
    } catch {
      // No server cart yet is acceptable.
    }

    for (const item of guestItems) {
      if (!item.productId || item.quantity <= 0) continue;

      const existingQty = existingCounts.get(item.productId) ?? 0;
      const targetQty = existingQty + item.quantity;

      try {
        if (existingQty === 0) {
          await axios.post(
            CART_ENDPOINTS.cart,
            { productId: item.productId },
            { headers: { token } },
          );

          if (targetQty > 1) {
            await axios.put(
              CART_ENDPOINTS.cartItem(item.productId),
              { count: targetQty },
              { headers: { token } },
            );
          }
        } else {
          await axios.put(
            CART_ENDPOINTS.cartItem(item.productId),
            { count: targetQty },
            { headers: { token } },
          );
        }
      } catch {
        mergeHadFailures = true;
        console.warn(`Failed to merge guest cart item: ${item.productId}`);
      }
    }

    clearGuestCart();
  }

  // Fetch the final cart directly with the token so we bypass the server
  // action's cookie read — cookie may not be accessible in the same
  // request cycle that just called setToken.
  const { data: cartResponse } = await axios.get<BackendGetCartResponse>(
    CART_ENDPOINTS.cart,
    { headers: { token } },
  );
  const items = mapBackendCartToItems(cartResponse.data);

  // Populate Redux by dispatching fetchCart.fulfilled directly.
  // This sets cartId, items, total, numOfCartItems and marks initialized = true.
  dispatch(
    fetchCart.fulfilled(
      {
        cartId: cartResponse.data._id,
        items,
        total: cartResponse.data.totalCartPrice,
        numOfCartItems: cartResponse.numOfCartItems,
      },
      "",
      undefined,
    ),
  );

  return {
    hasGuestItems,
    mergeHadFailures,
  };
}

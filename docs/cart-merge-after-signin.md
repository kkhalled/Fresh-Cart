# Cart Merge After Sign-In (Simple Guide)

This document explains how your app currently merges guest cart items after a user signs in.

## Short Answer

After login, the app:
1. Reads guest cart items from localStorage.
2. Sends each item to the server cart.
3. Sets server quantity for each merged item.
4. Clears localStorage guest cart.
5. Refetches the full server cart and updates Redux.

## Where This Happens

- Login/initialization trigger: `src/features/cart/hooks/useCartActions.ts`
- Merge thunk: `src/features/cart/store/cart.thunks.ts`
- Server merge logic: `src/features/cart/server/cart.server.ts`
- Guest localStorage helpers: `src/features/cart/utils/guestCart.storage.ts`
- Redux state update: `src/features/cart/store/cart.slice.ts`

## Step-by-Step Flow

### 1) User becomes authenticated
In `useCartActions`, the hook watches `isAuthenticated`.

- It sets cart mode to `auth`.
- It resets `initialized` when auth state changes.
- Then initialization runs again.

### 2) On init, check guest cart from localStorage
Still in `useCartActions`:

- If authenticated, it loads guest items with `getGuestCart()`.
- If there are guest items, it dispatches `mergeGuestCartThunk(...)`.
- If no guest items, it just dispatches `fetchCart()`.

### 3) Thunk merges and normalizes result
In `mergeGuestCartThunk`:

- Calls `mergeGuestCart(guestItems)` on the server layer.
- On success, calls `clearGuestCart()` (removes localStorage guest cart).
- Calls `getCart()` to fetch full populated cart.
- Maps backend cart to UI item shape and returns payload.

### 4) Server merge logic for each item
In `mergeGuestCart(items)`:

For each guest item:
- `addToCart(productId)` is called first.
- If `quantity > 1`, then `updateQuantity(productId, quantity)` is called.

So each item is merged one-by-one in sequence.

### 5) Redux final state
In `cart.slice` on `mergeGuestCartThunk.fulfilled`:

- `loading = false`
- `cartId`, `items`, `total`, `numOfCartItems` are replaced with server values
- `initialized = true`

User sees merged cart from server as source of truth.

## Important Behavior to Know

### Quantity behavior can overwrite, not always add
Current merge logic sets quantity to guest quantity for each product after adding.

Example:
- Server already has product A = 5
- Guest has product A = 2
- Merge does `addToCart(A)` then `updateQuantity(A, 2)`

Final can become `2` (or API-dependent), not `7`.

If your goal is true additive merge (`server + guest`), this is the main place to improve.

### Failure behavior
If merge fails in `useCartActions`:
- A toast error is shown.
- It falls back to `fetchCart()`.
- Guest localStorage is only cleared inside thunk success path, so failed merge usually keeps guest items.

## Practical Summary

Your merge currently means:
- "Take guest items and push them into server cart on login, then trust server cart."
- It works for basic transfer.
- It is not guaranteed to do additive quantity merge when product already exists in server cart.

If you want, I can prepare a second doc with an improved merge strategy (additive + dedupe + retry-safe/idempotent) and then implement it.
import { redirect } from "next/navigation";

/**
 * The payment gateway redirects to /allorders after a successful online payment.
 * This page simply redirects to our canonical /orders route.
 */
export default function AllOrdersPage() {
  redirect("/orders");
}


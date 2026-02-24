import { connection } from "next/server";
import React from "react";
import ForgotPassword from "../components/forgotpassword/ForgotPassword";

export default async function ForgotPasswordScreen() {
  await connection();
  return (
    <>
      <ForgotPassword />
    </>
  );
}

import { connection } from "next/server";
import React from "react";
import ResetPassword from "../components/forgotpassword/ResetPassword";

export default async function ResetPasswordScreen() {
  await connection();
  return (
    <>
      <ResetPassword />
    </>
  );
}

import React from "react";
import VerifyResetCode from "../components/forgotpassword/VerifyResetCode";
import { connection } from "next/server";

export default async function VerifyResetCodeScreen() {
  await connection();
  return (
    <>
      <VerifyResetCode />
    </>
  );
}

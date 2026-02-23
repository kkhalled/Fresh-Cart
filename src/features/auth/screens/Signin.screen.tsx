import React from "react";
import SigninForm from "../components/signin/SigninForm";
import SigninHero from "../components/signin/SigninHero";

export default function SigninScreen() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] h-screen overflow-hidden"
     style={{ background:"linear-gradient(160deg,#faf9f6 0%,#f3f0e8 55%,#eef5ee 100%)" }}>
      <div className="hidden lg:block h-full">
        <SigninHero />
      </div>

      <div className="h-full overflow-y-auto w-1/1">
        <SigninForm />
      </div>
    </div>
  );
}

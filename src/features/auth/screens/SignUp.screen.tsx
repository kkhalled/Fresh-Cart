// ─────────────────────────────────────────────────────────────────────────────
// SignUpPage.jsx  (your route file, e.g. app/(auth)/signup/page.tsx)
//
// THE KEY FIX:
//   The page was scrollable because nothing forced it to stay within the
//   viewport. Adding `h-screen overflow-hidden` to the outer grid keeps
//   the signup section locked to exactly one screen — no footer bleed.
// ─────────────────────────────────────────────────────────────────────────────

import SignUpHero from "../components/signup/SignUpHero";
import SignUpForm from "../components/signup/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] h-screen overflow-hidden">
      {/*
        Left: Hero panel — 55% width on large screens.
        Slightly wider than 50/50 so the headline has room to breathe.
      */}
      <div className="hidden lg:block h-full">
        <SignUpHero />
      </div>

      {/*
        Right: Form panel — 45% width, own background, centered.
        h-full ensures it fills the column so there's no white void.
      */}
      <div className="h-full overflow-y-auto w-1/1">
        <SignUpForm />
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// ALSO: Add Playfair Display to your global layout so the hero font loads.
// In app/layout.tsx (or _app.tsx), add to your <head>:
//
//   <link
//     href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,700&display=swap"
//     rel="stylesheet"
//   />
//
// Or in globals.css:
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,700&display=swap');
// ─────────────────────────────────────────────────────────────────────────────
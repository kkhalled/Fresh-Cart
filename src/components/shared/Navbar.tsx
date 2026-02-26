// Server Component — no "use client"
import NavbarTopBar from "./NavbarTopBar";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  return <NavbarClient topBar={<NavbarTopBar />} />;
}
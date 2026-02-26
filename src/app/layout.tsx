import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles";
import { Exo } from "next/font/google";
import Providers from "./../providers/providers";
import { verifyToken } from "../features/auth/server/auth.action";
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh groceries delivered fast",
  icons: {
    icon: "/mini-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const verifyTokenResult = await verifyToken();

  return (
    <>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </head>
        <body className={` antialiased ${exo.className} font-medium`}>
          <Providers preloadedState={{ auth: verifyTokenResult }}>
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}

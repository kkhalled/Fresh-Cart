import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
        <body className={` antialiased ${exo.className} font-medium`}>
          <Providers preloadedState={{ auth: verifyTokenResult }}>
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}

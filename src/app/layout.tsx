import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";

import { PrimeReactProvider } from "primereact/api";

import Tailwind from "primereact/passthrough/tailwind";

import "./globals.css";
import { ReduxProvider } from "@/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialize the font with the weights you need
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // Optional: for CSS variable usage
  display: "swap",
});

export const metadata: Metadata = {
  title: "StayEasy",
  description: "Find your stay, hassle free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <body className={poppins.className} suppressHydrationWarning>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </PrimeReactProvider>
    </html>
  );
}

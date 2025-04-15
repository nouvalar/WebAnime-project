"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a]`}>
        <Providers>
          <NavigationBar />
          <main className="bg-gray-800">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Providers from "./providers";
import { DarkModeProvider } from "@/context/DarkModeContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark:bg-[#1a1a1a] bg-gray-100 min-h-screen`}>
        <Providers>
          <DarkModeProvider>
            <NavigationBar />
            <main className="dark:bg-[#1F2937] bg-white min-h-screen transition-colors duration-200">
              {children}
            </main>
          </DarkModeProvider>
        </Providers>
      </body>
    </html>
  );
}
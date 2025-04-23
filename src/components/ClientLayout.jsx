"use client"

import NavigationBar from "@/components/NavigationBar";
import Providers from "@/app/providers";
import { DarkModeProvider } from "@/context/DarkModeContext";

export default function ClientLayout({ children }) {
    return (
        <Providers>
            <DarkModeProvider>
                <div className="dark:bg-[#1a1a1a] bg-gray-100 min-h-screen">
                    <NavigationBar />
                    <main className="dark:bg-[#1F2937] bg-white min-h-screen transition-colors duration-200">
                        {children}
                    </main>
                </div>
            </DarkModeProvider>
        </Providers>
    );
} 
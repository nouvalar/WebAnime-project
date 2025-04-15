"use client"

import Link from "next/link"
import InputSearch from "./InputSearch"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

const NavigationBar = () => {
    const { data: session } = useSession()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' })
    }

    return (
        <div className="bg-[#F5C518]">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-between items-center gap-8">
                    <Link href="/" className="font-bold text-2xl text-black hover:text-gray-800">
                        ANIMELIST
                    </Link>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <InputSearch />
                        <div className="flex gap-2">
                            {!session ? (
                                <>
                                    <Link 
                                        href="/login" 
                                        className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <span>{session.user.name}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] border border-gray-700 rounded-md shadow-lg overflow-hidden z-10">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-white hover:bg-[#F5C518] hover:text-black transition-colors"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <div className="block px-4 py-2 text-sm text-white hover:bg-[#F5C518] hover:text-black transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <Link
                                                        href="/watchlist"
                                                        onClick={() => setIsDropdownOpen(false)}
                                                    >
                                                        Watchlist
                                                    </Link>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#F5C518] hover:text-black transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
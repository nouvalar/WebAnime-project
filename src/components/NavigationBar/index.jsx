"use client"

import Link from "next/link"
import InputSearch from "./InputSearch"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { List, X } from "@phosphor-icons/react"

const NavigationBar = () => {
    const { data: session } = useSession()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' })
    }

    return (
        <div className="bg-[#F5C518] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    <Link href="/" className="font-bold text-2xl text-black hover:text-gray-800">
                        ANIMELIST
                    </Link>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <div className="w-[400px]">
                            <InputSearch />
                        </div>
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
                                        <span>{session.user?.name}</span>
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
                                            <Link
                                                href="/watchlist"
                                                className="block px-4 py-2 text-sm text-white hover:bg-[#F5C518] hover:text-black transition-colors"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Watchlist
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleSignOut()
                                                    setIsDropdownOpen(false)
                                                }}
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

                {/* Mobile Layout */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="font-bold text-2xl text-black hover:text-gray-800">
                            ANIMELIST
                        </Link>
                        <button
                            className="text-black"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
                        </button>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="mt-4 flex flex-col gap-4">
                            <InputSearch />
                            <div className="flex flex-col gap-2">
                                {!session ? (
                                    <>
                                        <Link 
                                            href="/login" 
                                            className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium text-center"
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium text-center"
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <span>{session.user?.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 left-0 mt-2 bg-[#1F2937] border border-gray-700 rounded-md shadow-lg overflow-hidden z-10">
                                                <Link
                                                    href="/profile"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#F5C518] hover:text-black transition-colors"
                                                    onClick={() => {
                                                        setIsDropdownOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                    }}
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/watchlist"
                                                    className="block px-4 py-2 text-sm text-white hover:bg-[#F5C518] hover:text-black transition-colors"
                                                    onClick={() => {
                                                        setIsDropdownOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                    }}
                                                >
                                                    Watchlist
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        handleSignOut()
                                                        setIsDropdownOpen(false)
                                                        setIsMobileMenuOpen(false)
                                                    }}
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
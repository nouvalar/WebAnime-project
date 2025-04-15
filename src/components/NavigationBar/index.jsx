"use client"

import Link from "next/link"
import InputSearch from "./InputSearch"

const NavigationBar = () => {
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
                            <Link 
                                href="/login" 
                                className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#F5C518] transition-colors font-medium"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#F5C518] transition-colors font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
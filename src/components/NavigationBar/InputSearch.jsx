"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        const keyword = searchRef.current.value

        if (!keyword) return

        if (event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            router.push(`/search/${keyword}`)
        }
    }

    return (
        <div className="relative flex-1 max-w-xl">
            <input
                placeholder="cari anime..."
                className="w-full p-2 rounded-md bg-[#FFD700] text-black placeholder:text-black border border-[#F5C518] focus:border-[#E5B517] focus:outline-none"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-black"
                onClick={handleSearch}
            >
                <MagnifyingGlass size={24} />
            </button>
        </div>
    )
}

export default InputSearch
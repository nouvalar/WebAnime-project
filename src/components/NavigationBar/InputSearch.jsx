"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        const keyword = searchRef.current.value
        
        if(!keyword || keyword.trim() === "") return

        if(event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            router.push(`/search/${keyword}`)
        }
    }

    return (
        <div className="relative flex items-center flex-1 max-w-xl">
            <input 
                placeholder="cari anime..." 
                className="w-full p-2 pl-3 text-base rounded-md dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button 
                className="absolute right-2 p-2 dark:text-gray-400 text-gray-600 hover:text-yellow-500 transition-colors"
                onClick={handleSearch}
            >
                <MagnifyingGlass size={20} />
            </button>
        </div>
    )
}

export default InputSearch
"use client"

import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">{title}</h1>
            {linkHref && linkTitle ? 
                <Link href={linkHref} 
                    className="md:text-xl text-md dark:text-gray-300 text-gray-600 hover:text-yellow-500 transition-all"
                >
                    {linkTitle}
                </Link>
                : null
            }
        </div>
    )
}

export default Header
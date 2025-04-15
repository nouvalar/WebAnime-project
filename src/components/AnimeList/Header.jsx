"use client"

import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {linkHref && linkTitle ? 
                <Link href={linkHref} 
                    className="text-white underline hover:text-gray-200 transition-colors !text-white">
                    {linkTitle}
                </Link>
                : null
            }
        </div>
    )
}

export default Header
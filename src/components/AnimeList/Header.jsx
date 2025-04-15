"use client"

import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                    {title}
                </h2>
                {linkHref && linkTitle ? (
                    <Link 
                        href={linkHref}
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        {linkTitle}
                    </Link>
                ) : null}
            </div>
        </div>
    )
}

export default Header
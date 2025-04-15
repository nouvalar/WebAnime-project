"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { User } from "@phosphor-icons/react"
import { useDarkMode } from "@/context/DarkModeContext"

const Page = () => {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('profile')
    const { darkMode, toggleDarkMode } = useDarkMode()

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">Not Authenticated</h1>
                    <p className="dark:text-gray-400 text-gray-600">Please login to view your profile</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="dark:bg-[#1a1a1a] bg-white rounded-lg p-4 md:p-6 mb-6 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <div className="w-24 h-24 dark:bg-gray-800 bg-gray-100 rounded-full flex items-center justify-center">
                            <User size={48} weight="fill" className="dark:text-gray-400 text-gray-600" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">{session.user?.name || "User"}</h1>
                            <p className="dark:text-gray-400 text-gray-600">{session.user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex overflow-x-auto border-b dark:border-gray-700 border-gray-200 mb-6 scrollbar-hide">
                    <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                            activeTab === 'profile'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                            activeTab === 'watchlist'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('watchlist')}
                    >
                        Watchlist
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                            activeTab === 'settings'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                {/* Content Section */}
                <div className="dark:bg-[#1a1a1a] bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">Profile Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">Full Name</label>
                                        <p className="dark:text-white text-gray-900">{session.user?.name || "User"}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">Email</label>
                                        <p className="dark:text-white text-gray-900">{session.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">Account Statistics</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="dark:bg-[#2a2a2a] bg-gray-50 p-4 rounded-lg">
                                        <p className="dark:text-gray-400 text-gray-600 text-sm">Watched Anime</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                    <div className="dark:bg-[#2a2a2a] bg-gray-50 p-4 rounded-lg">
                                        <p className="dark:text-gray-400 text-gray-600 text-sm">Watchlist</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                    <div className="dark:bg-[#2a2a2a] bg-gray-50 p-4 rounded-lg">
                                        <p className="dark:text-gray-400 text-gray-600 text-sm">Reviews</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'watchlist' && (
                        <div>
                            <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">My Watchlist</h2>
                            <div className="dark:text-gray-400 text-gray-600 text-center py-8">
                                No anime in your watchlist yet
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">Account Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600">Email Notifications</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5C518]"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600">Dark Mode</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={darkMode}
                                            onChange={toggleDarkMode}
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5C518]"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page 
"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { User } from "@phosphor-icons/react"

const Page = () => {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('profile')

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Not Authenticated</h1>
                    <p className="text-gray-400">Please login to view your profile</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                            <User size={48} weight="fill" className="text-gray-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">{session.user?.name || "User"}</h1>
                            <p className="text-gray-400">{session.user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-700 mb-6">
                    <button
                        className={`px-6 py-3 text-sm font-medium ${
                            activeTab === 'profile'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${
                            activeTab === 'watchlist'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('watchlist')}
                    >
                        Watchlist
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${
                            activeTab === 'settings'
                                ? 'text-[#F5C518] border-b-2 border-[#F5C518]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                {/* Content Section */}
                <div className="bg-[#1a1a1a] rounded-lg p-6">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <p className="text-white">{session.user?.name || "User"}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <p className="text-white">{session.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-4">Account Statistics</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                                        <p className="text-gray-400 text-sm">Watched Anime</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                                        <p className="text-gray-400 text-sm">Watchlist</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                                        <p className="text-gray-400 text-sm">Reviews</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'watchlist' && (
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-4">My Watchlist</h2>
                            <div className="text-gray-400 text-center py-8">
                                No anime in your watchlist yet
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Notifications</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5C518]"></div>
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Dark Mode</label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
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
"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { User } from "@phosphor-icons/react"
import { useDarkMode } from "@/context/DarkModeContext"
import { useWatchlist } from "@/context/WatchlistContext"

const Page = () => {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('profile')
    const { darkMode, toggleDarkMode } = useDarkMode()
    const { watchlistCount } = useWatchlist()
    const [stats, setStats] = useState({
        watchedAnime: 0,
        watchlist: 0,
        reviews: 0
    })
    const [editName, setEditName] = useState(session?.user?.name || "");
    const [editEmail, setEditEmail] = useState(session?.user?.email || "");
    const [editPassword, setEditPassword] = useState("");
    const [editLoading, setEditLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState("");
    const [editError, setEditError] = useState("");

    useEffect(() => {
        const fetchUserStats = async () => {
            if (!session) return

            try {
                const response = await fetch('/api/user-stats')
                if (!response.ok) {
                    throw new Error('Failed to fetch user stats')
                }
                const data = await response.json()
                setStats(data)
            } catch (error) {
                console.error('Error fetching user stats:', error)
            }
        }

        fetchUserStats()
    }, [session, watchlistCount])

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditSuccess("");
        setEditError("");
        try {
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    email: editEmail,
                    password: editPassword || undefined,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setEditSuccess("Profile updated successfully!");
                setEditPassword("");
                // Optionally, refresh session here
            } else {
                setEditError(data.message || "Failed to update profile");
            }
        } catch {
            setEditError("Failed to update profile");
        }
        setEditLoading(false);
    };

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
                                        <p className="text-2xl font-bold text-[#F5C518]">{stats.watchedAnime}</p>
                                    </div>
                                    <div className="dark:bg-[#2a2a2a] bg-gray-50 p-4 rounded-lg">
                                        <p className="dark:text-gray-400 text-gray-600 text-sm">Watchlist</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">{stats.watchlist}</p>
                                    </div>
                                    <div className="dark:bg-[#2a2a2a] bg-gray-50 p-4 rounded-lg">
                                        <p className="dark:text-gray-400 text-gray-600 text-sm">Reviews</p>
                                        <p className="text-2xl font-bold text-[#F5C518]">{stats.reviews}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'watchlist' && (
                        <div>
                            <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">My Watchlist</h2>
                            <div className="dark:text-gray-400 text-gray-600 text-center py-8">
                                {stats.watchlist === 0 ? (
                                    "No anime in your watchlist yet"
                                ) : (
                                    `You have ${stats.watchlist} anime in your watchlist`
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">Account Settings</h2>
                            <form onSubmit={handleEditProfile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600">Full Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={e => setEditName(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        value={editEmail}
                                        onChange={e => setEditEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600">New Password</label>
                                    <input
                                        type="password"
                                        value={editPassword}
                                        onChange={e => setEditPassword(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                                        placeholder="Leave blank to keep current password"
                                    />
                                </div>
                                {editSuccess && <div className="text-green-600">{editSuccess}</div>}
                                {editError && <div className="text-red-600">{editError}</div>}
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="w-full bg-[#FFD700] text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors font-medium"
                                >
                                    {editLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page 
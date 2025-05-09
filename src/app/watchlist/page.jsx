"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import WatchlistButton from "@/components/AnimeList/WatchlistButton"

const WatchlistPage = () => {
    const { data: session } = useSession()
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchWatchlist = async () => {
        if (!session) {
            setLoading(false)
            return
        }

        try {
            setError(null)
            const watchlistResponse = await fetch("/api/watchlist")
            if (!watchlistResponse.ok) {
                throw new Error("Failed to fetch watchlist")
            }
            const watchlistData = await watchlistResponse.json()

            // Add delay between API calls to avoid rate limiting
            const animeData = []
            for (const item of watchlistData) {
                try {
                    const response = await fetch(`https://api.jikan.moe/v4/anime/${item.animeId}`)
                    if (!response.ok) {
                        console.error(`Failed to fetch anime ${item.animeId}`)
                        continue
                    }
                    const data = await response.json()
                    if (data.data) {
                        animeData.push(data.data)
                    }
                    // Add a small delay between requests to respect API rate limits
                    await new Promise(resolve => setTimeout(resolve, 1000))
                } catch (error) {
                    console.error(`Error fetching anime ${item.animeId}:`, error)
                }
            }

            setWatchlist(animeData)
        } catch (error) {
            console.error("Error fetching watchlist:", error)
            setError("Terjadi kesalahan saat mengambil data watchlist")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWatchlist()
    }, [session])

    const handleWatchlistUpdate = () => {
        setLoading(true)
        fetchWatchlist()
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Silakan Login</h1>
                    <p className="mb-4">Untuk melihat watchlist Anda, silakan login terlebih dahulu.</p>
                    <Link
                        href="/login"
                        className="bg-[#F5C518] text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setLoading(true)
                            fetchWatchlist()
                        }}
                        className="bg-[#F5C518] text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Watchlist Saya</h1>
                {watchlist.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400">Watchlist Anda masih kosong</p>
                        <Link
                            href="/"
                            className="inline-block mt-4 bg-[#F5C518] text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
                        >
                            Jelajahi Anime
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {watchlist.map((anime) => (
                            <div key={anime.mal_id} className="bg-gray-800 rounded-lg overflow-hidden">
                                <Link href={`/anime/${anime.mal_id}`}>
                                    <img
                                        src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url}
                                        alt={anime.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </Link>
                                <div className="p-4">
                                    <Link href={`/anime/${anime.mal_id}`}>
                                        <h2 className="text-xl font-semibold mb-2 hover:text-yellow-400 transition-colors">
                                            {anime.title}
                                        </h2>
                                    </Link>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-400">Skor: {anime.score || "N/A"}</p>
                                            <p className="text-sm text-gray-400">Episode: {anime.episodes || "N/A"}</p>
                                        </div>
                                        <WatchlistButton
                                            animeId={anime.mal_id}
                                            initialIsInWatchlist={true}
                                            onUpdate={handleWatchlistUpdate}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchlistPage 
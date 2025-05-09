"use client"

import { useEffect, useState } from "react"
import WatchlistButton from "@/components/AnimeList/WatchlistButton"
import { useSession } from "next-auth/react"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import { ArrowLeft } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const Page = async ({ params }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [anime, setAnime] = useState(null)
    const [isInWatchlist, setIsInWatchlist] = useState(false)

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
                const data = await response.json()
                setAnime(data.data)
            } catch (error) {
                console.error("Error fetching anime:", error)
            }
        }

        const checkWatchlist = async () => {
            if (session) {
                try {
                    const response = await fetch(`/api/watchlist?animeId=${params.id}`)
                    const data = await response.json()
                    setIsInWatchlist(data.isInWatchlist)
                } catch (error) {
                    console.error("Error checking watchlist:", error)
                }
            }
        }

        fetchAnime()
        checkWatchlist()
    }, [params.id, session])

    if (!anime) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 bg-[#F5C518] text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
                    >
                        <ArrowLeft size={24} weight="bold" />
                        <span>Kembali</span>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-start gap-4">
                        <img
                            src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url}
                            alt={anime.title}
                            className="w-[300px] rounded-lg shadow-lg"
                        />
                        <WatchlistButton
                            animeId={params.id}
                            initialIsInWatchlist={isInWatchlist}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-gray-400">Skor</p>
                                <p className="font-semibold">{anime.score || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Episode</p>
                                <p className="font-semibold">{anime.episodes || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Status</p>
                                <p className="font-semibold">{anime.status || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Tahun</p>
                                <p className="font-semibold">{anime.year || "N/A"}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
                            <p className="text-gray-300">{anime.synopsis || "Tidak ada sinopsis"}</p>
                        </div>
                    </div>
                </div>
                {anime.trailer?.youtube_id && (
                    <div className="mt-8">
                        <VideoPlayer youtubeId={anime.trailer.youtube_id}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
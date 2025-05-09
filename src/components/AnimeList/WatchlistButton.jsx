"use client"

import { useState, useEffect } from "react"
import { Star } from "@phosphor-icons/react"
import { useSession } from "next-auth/react"
import Alert from "@/components/Alert"
import { useWatchlist } from "@/context/WatchlistContext"

const WatchlistButton = ({ animeId, initialIsInWatchlist = false, onUpdate }) => {
    const { data: session } = useSession()
    const { updateWatchlistCount } = useWatchlist()
    const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const checkWatchlistStatus = async () => {
            if (!session) {
                setIsLoading(false)
                return
            }

            try {
                setError(null)
                const response = await fetch(`/api/watchlist?animeId=${animeId}`)
                if (!response.ok) {
                    throw new Error("Gagal mengambil status watchlist")
                }
                const data = await response.json()
                
                // Update status watchlist berdasarkan response dari API
                if (data.isInWatchlist !== undefined) {
                    setIsInWatchlist(data.isInWatchlist)
                }
            } catch (error) {
                console.error("Error memeriksa status watchlist:", error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        checkWatchlistStatus()
    }, [session, animeId])

    const handleWatchlist = async () => {
        if (!session) {
            setAlertMessage("Silakan login terlebih dahulu")
            setShowAlert(true)
            return
        }

        if (isUpdating) return

        setIsUpdating(true)
        try {
            const response = await fetch("/api/watchlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    animeId: String(animeId),
                    action: isInWatchlist ? "remove" : "add"
                }),
            })

            if (!response.ok) {
                throw new Error("Gagal memperbarui watchlist")
            }

            const newWatchlistState = !isInWatchlist
            setIsInWatchlist(newWatchlistState)
            setAlertMessage(newWatchlistState ? "Berhasil ditambahkan ke watchlist" : "Berhasil dihapus dari watchlist")
            setShowAlert(true)

            // Update the global watchlist count
            await updateWatchlistCount()

            if (onUpdate) {
                onUpdate()
            }
        } catch (error) {
            console.error("Error memperbarui watchlist:", error)
            setAlertMessage("Terjadi kesalahan saat memperbarui watchlist")
            setShowAlert(true)
        } finally {
            setIsUpdating(false)
        }
    }

    if (isLoading) {
        return (
            <button
                disabled
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md opacity-50"
            >
                <Star weight="regular" size={20} />
                Memuat...
            </button>
        )
    }

    if (error) {
        return (
            <button
                disabled
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md opacity-50"
            >
                <Star weight="regular" size={20} />
                Error
            </button>
        )
    }

    return (
        <>
            {showAlert && (
                <div className="fixed inset-x-0 top-4 flex justify-center z-[100]">
                    <Alert
                        message={alertMessage}
                        type="success"
                        onClose={() => setShowAlert(false)}
                    />
                </div>
            )}
            <button
                onClick={handleWatchlist}
                disabled={isUpdating}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isInWatchlist
                        ? "bg-[#F5C518] text-black hover:bg-yellow-400"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <Star weight={isInWatchlist ? "fill" : "regular"} size={20} />
                {isInWatchlist ? "Watchlist" : "Tambah ke Watchlist"}
            </button>
        </>
    )
}

export default WatchlistButton 
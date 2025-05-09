import { NextResponse } from "next/server"
import { connect } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Watchlist from "@/models/watchlist"
import mongoose from "mongoose"

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        await connect()
        const { animeId, action } = await request.json()
        const userId = session.user.id

        if (!animeId || !action) {
            return NextResponse.json(
                { message: "animeId dan action harus diisi" },
                { status: 400 }
            )
        }

        if (action === "add") {
            try {
                await Watchlist.create({
                    userId: new mongoose.Types.ObjectId(userId),
                    animeId: String(animeId)
                })
                return NextResponse.json({ message: "Anime ditambahkan ke watchlist" })
            } catch (error) {
                // Jika error karena duplikasi, abaikan
                if (error.code === 11000) {
                    return NextResponse.json({ message: "Anime sudah ada di watchlist" })
                }
                throw error
            }
        } else if (action === "remove") {
            const result = await Watchlist.findOneAndDelete({
                userId: new mongoose.Types.ObjectId(userId),
                animeId: String(animeId)
            })
            if (!result) {
                return NextResponse.json(
                    { message: "Anime tidak ditemukan di watchlist" },
                    { status: 404 }
                )
            }
            return NextResponse.json({ message: "Anime dihapus dari watchlist" })
        }

        return NextResponse.json(
            { message: "Invalid action" },
            { status: 400 }
        )
    } catch (error) {
        console.error("Watchlist error:", error)
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        await connect()
        const userId = session.user.id
        
        // Get animeId from query parameter
        const { searchParams } = new URL(request.url)
        const animeId = searchParams.get('animeId')

        if (animeId) {
            // Check if specific anime is in watchlist
            const exists = await Watchlist.exists({
                userId: new mongoose.Types.ObjectId(userId),
                animeId: String(animeId)
            })
            return NextResponse.json({ isInWatchlist: !!exists })
        }

        // If no animeId provided, return full watchlist
        const watchlistItems = await Watchlist.find({
            userId: new mongoose.Types.ObjectId(userId)
        }).lean()

        const watchlist = watchlistItems.map(item => ({
            animeId: item.animeId
        }))

        return NextResponse.json(watchlist)
    } catch (error) {
        console.error("Watchlist error:", error)
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        )
    }
} 
import { NextResponse } from "next/server"
import { connect } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Watchlist from "@/models/watchlist"
import mongoose from "mongoose"

export async function GET() {
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

        // Get watchlist count
        const watchlistCount = await Watchlist.countDocuments({
            userId: new mongoose.Types.ObjectId(userId)
        })

        // For now, other stats are hardcoded as they haven't been implemented
        const stats = {
            watchedAnime: 0,
            watchlist: watchlistCount,
            reviews: 0
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error("User stats error:", error)
        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        )
    }
} 
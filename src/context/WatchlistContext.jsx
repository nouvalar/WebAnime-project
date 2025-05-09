"use client"

import { createContext, useContext, useState, useCallback } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
    const [watchlistCount, setWatchlistCount] = useState(0)

    const updateWatchlistCount = useCallback(async () => {
        try {
            const response = await fetch('/api/user-stats')
            if (!response.ok) {
                throw new Error('Failed to fetch user stats')
            }
            const data = await response.json()
            setWatchlistCount(data.watchlist)
        } catch (error) {
            console.error('Error updating watchlist count:', error)
        }
    }, [])

    return (
        <WatchlistContext.Provider value={{ watchlistCount, updateWatchlistCount }}>
            {children}
        </WatchlistContext.Provider>
    )
}

export function useWatchlist() {
    const context = useContext(WatchlistContext)
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider')
    }
    return context
} 
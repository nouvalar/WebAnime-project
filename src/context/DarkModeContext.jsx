"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setDarkMode(isDark)
    }, [])

    const toggleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export function useDarkMode() {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
} 
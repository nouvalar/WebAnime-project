"use client"

import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true'
        setDarkMode(isDark)
        document.documentElement.classList.toggle('dark', isDark)
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem('darkMode', !darkMode)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => useContext(DarkModeContext) 
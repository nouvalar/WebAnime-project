"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "@phosphor-icons/react"

export default function Alert({ message, type = "success", onClose }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            onClose?.()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    if (!isVisible) return null

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
            type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
            {type === "success" ? (
                <CheckCircle size={24} weight="fill" />
            ) : (
                <XCircle size={24} weight="fill" />
            )}
            <p className="font-medium">{message}</p>
            <button
                onClick={() => {
                    setIsVisible(false)
                    onClose?.()
                }}
                className="ml-2 text-current hover:opacity-80"
            >
                ✕
            </button>
        </div>
    )
} 
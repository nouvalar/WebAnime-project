"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Alert from "@/components/Alert"

export default function RegisterPage() {
    const router = useRouter()
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("success")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message)
                setAlertMessage(data.message)
                setAlertType("error")
                setShowAlert(true)
                return
            }

            setAlertMessage("Registrasi berhasil! Silakan login")
            setAlertType("success")
            setShowAlert(true)
            router.push("/login")
        } catch (error) {
            setError("Terjadi kesalahan saat registrasi")
            setAlertMessage("Terjadi kesalahan saat registrasi")
            setAlertType("error")
            setShowAlert(true)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {showAlert && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className="max-w-md w-full bg-[#F5C518] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Daftar ANIMELIST</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-black">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            required
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F5C518] focus:border-[#F5C518]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F5C518] focus:border-[#F5C518]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F5C518] focus:border-[#F5C518]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FFD700] text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors font-medium"
                    >
                        Daftar
                    </button>
                    <p className="text-center text-sm text-black">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="font-medium hover:text-yellow-700">
                            Login di sini
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
} 
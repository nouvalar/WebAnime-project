"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Alert from "@/components/Alert"

export default function LoginPage() {
    const router = useRouter()
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
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Email atau password salah")
                setAlertMessage("Email atau password salah")
                setAlertType("error")
                setShowAlert(true)
            } else {
                setAlertMessage("Login berhasil!")
                setAlertType("success")
                setShowAlert(true)
                router.push("/")
            }
        } catch (error) {
            setError("Terjadi kesalahan saat login")
            setAlertMessage("Terjadi kesalahan saat login")
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
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Login ANIMELIST</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                    <p className="text-center text-sm text-black">
                        Belum punya akun?{" "}
                        <Link href="/register" className="font-medium hover:text-yellow-700">
                            Daftar di sini
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
} 
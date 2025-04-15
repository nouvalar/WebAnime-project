"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const Page = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false
            })

            if (res.error) {
                setError("Email atau password salah")
                return
            }

            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Login error:", error)
            setError("Terjadi kesalahan saat login")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#F5C518] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Login ke ANIMELIST</h2>
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F5C518] focus:border-[#F5C518]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#FFD700] text-black py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors font-medium disabled:opacity-50"
                    >
                        {isLoading ? "Memproses..." : "Masuk"}
                    </button>
                    <p className="text-center text-sm text-black">
                        Belum punya akun?{" "}
                        <a href="/register" className="font-medium hover:text-yellow-700">
                            Daftar di sini
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Page 
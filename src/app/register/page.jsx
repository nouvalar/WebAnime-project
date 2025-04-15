"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        fullname: "",
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
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Terjadi kesalahan saat mendaftar")
            }

            console.log("Registrasi berhasil:", data)
            router.push("/login")
        } catch (err) {
            console.error("Error saat registrasi:", err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
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
                            value={formData.fullname}
                            onChange={handleChange}
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
                        {isLoading ? "Mendaftar..." : "Daftar"}
                    </button>
                    <p className="text-center text-sm text-black">
                        Sudah punya akun?{" "}
                        <a href="/login" className="font-medium hover:text-yellow-700">
                            Login di sini
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Page 
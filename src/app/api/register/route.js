import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/mongodb";
import { hash } from "bcrypt";
import User from "@/models/user";

export async function POST(request) {
    console.log("=== Memulai proses registrasi ===");
    
    try {
        const { fullname, email, password } = await request.json();
        console.log("Data yang diterima:", { fullname, email, passwordLength: password?.length });

        // Validasi input
        if (!fullname || !email || !password) {
            console.log("Validasi gagal: Data tidak lengkap");
            return NextResponse.json(
                { message: "Semua field harus diisi" },
                { status: 400 }
            );
        }

        console.log("Mencoba koneksi ke MongoDB...");
        // Koneksi ke MongoDB
        await connectMongoDB();
        console.log("MongoDB Connected Successfully!");

        // Cek apakah email sudah terdaftar
        console.log("Memeriksa email duplikat...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email sudah terdaftar:", email);
            return NextResponse.json(
                { message: "Email sudah terdaftar" },
                { status: 400 }
            );
        }

        // Hash password
        console.log("Melakukan hash password...");
        const hashedPassword = await hash(password, 10);

        // Buat user baru
        console.log("Membuat user baru...");
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        console.log("User berhasil dibuat:", {
            id: user._id,
            email: user.email
        });

        return NextResponse.json(
            { message: "Registrasi berhasil", user: { id: user._id, fullname, email } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error detail saat registrasi:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        
        // Berikan pesan error yang lebih spesifik
        let errorMessage = "Terjadi kesalahan internal server";
        if (error.name === "MongoServerError" && error.code === 11000) {
            errorMessage = "Email sudah terdaftar";
        } else if (error.name === "ValidationError") {
            errorMessage = Object.values(error.errors).map(err => err.message).join(", ");
        } else if (error.name === "MongooseError") {
            errorMessage = "Gagal terhubung ke database";
        }

        console.error("Pesan error yang akan dikirim:", errorMessage);

        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
} 
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        const conn = await connectMongoDB();
        
        return NextResponse.json({
            message: "MongoDB Connection Test",
            status: "success",
            details: {
                host: conn.connection.host,
                port: conn.connection.port,
                name: conn.connection.name,
                readyState: mongoose.connection.readyState
            }
        }, { status: 200 });
    } catch (error) {
        console.error("MongoDB Test Error:", {
            name: error.name,
            message: error.message,
            code: error.code
        });
        
        return NextResponse.json({
            message: "MongoDB Connection Test Failed",
            status: "error",
            error: {
                name: error.name,
                message: error.message,
                code: error.code
            }
        }, { status: 500 });
    }
} 
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "Connected to MongoDB successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
} 
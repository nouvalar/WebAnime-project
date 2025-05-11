import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/user";
import { connect } from "@/lib/db";
import bcrypt from "bcrypt";

export async function PUT(req) {
  await connect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { name, email, password } = await req.json();

  const updateData = {};
  if (name) updateData.fullname = name;
  if (email) updateData.email = email;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  try {
    await User.findByIdAndUpdate(session.user.id, updateData);
    return new Response(JSON.stringify({ message: "Profile updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, role, farmDetails, businessDetails } = body;

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Name, email, password, and phone are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (!db) {
      // In dev without active MongoDB, simulate successful registration
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
        role: role || "consumer",
        phone,
      };
      const token = signToken(mockUser);
      const res = NextResponse.json(
        { user: mockUser, message: "User registered successfully (simulated mode)" },
        { status: 201 }
      );
      res.cookies.set("farmconnect_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "consumer",
      farmDetails: role === "farmer" ? farmDetails : undefined,
      businessDetails: role === "buyer" ? businessDetails : undefined,
    });

    const userPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    const token = signToken(userPayload);
    const response = NextResponse.json(
      { user: userPayload, message: "Account created successfully" },
      { status: 201 }
    );
    response.cookies.set("farmconnect_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}

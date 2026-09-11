import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";
import { MOCK_USERS } from "@/data/mockData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    if (!db) {
      // Check mock users for seamless demo login without MongoDB
      const foundMock = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (foundMock) {
        const token = signToken({
          id: foundMock.id,
          name: foundMock.name,
          email: foundMock.email,
          role: foundMock.role,
          phone: foundMock.phone,
          avatar: foundMock.avatar,
        });

        const res = NextResponse.json({
          user: foundMock,
          message: "Login successful (Demo Mode)",
        });
        res.cookies.set("farmconnect_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        });
        return res;
      }

      // Default demo login for any credentials in demo mode
      const defaultUser = {
        id: "demo-user-" + Date.now(),
        name: email.split("@")[0],
        email,
        role: "consumer" as const,
      };
      const token = signToken(defaultUser);
      const res = NextResponse.json({
        user: defaultUser,
        message: "Login successful (Demo Mode)",
      });
      res.cookies.set("farmconnect_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const userPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    };

    const token = signToken(userPayload);
    const response = NextResponse.json({
      user: userPayload,
      message: "Login successful",
    });

    response.cookies.set("farmconnect_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}

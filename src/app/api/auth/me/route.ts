import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("farmconnect_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = verifyToken(token);
  return NextResponse.json({ user });
}

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete("farmconnect_token");
  return response;
}

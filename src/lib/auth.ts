import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "farmconnect_super_secret_jwt_key_for_development_purposes_only";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "consumer" | "buyer" | "admin";
  phone?: string;
  avatar?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}

export function signToken(payload: SessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

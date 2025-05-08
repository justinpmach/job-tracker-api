import jwt from "jsonwebtoken";
const { JWT_SECRET = "" } = process.env;
// const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

export function signJwt(payload: object, expiresIn = "1h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
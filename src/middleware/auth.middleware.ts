import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";

export interface AuthRequest extends Request {
  user?: { userId: number; email: string; }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const token = auth.split(" ")[1];
    const payload = verifyJwt<{ userId: number; email: string }>(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
}
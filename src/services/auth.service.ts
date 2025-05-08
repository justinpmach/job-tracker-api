import { prisma } from "../config/database"
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt.util";

const SALT_ROUNDS = 10;

export async function signupService(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hash,
    }
  });

  const token = signJwt({ userId: user.id, email: user.email });
  return { user, token };
}

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = signJwt({ userId: user.id, email: user.email });
  return { user, token };
}
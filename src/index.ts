import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
// import { prisma } from "./config/database";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import applicationRoutes from "./routes/application.routes";

dotenv.config();
const app = express();
app.use(express.json());

// Health check endpoint
// app.get("/health", (req: Request, res: Response) => {
//   prisma.$connect()
//     .then(() => {
//       res.send({ status: "ok" });
//     })
//     .catch((e) => {
//       res.status(500).send({ status: "error", message: e });
//     });
// });

// Public auth routes
app.use("/auth", authRoutes);

// Protected application CRUD routes
app.use("/applications", applicationRoutes);

// Example protected route
import { requireAuth, AuthRequest } from "./middleware/auth.middleware";
app.get("/me", requireAuth, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});

// Global error handler (after all routes)
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
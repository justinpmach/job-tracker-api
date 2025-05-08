import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function signupController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const { user, token } = await authService.signupService(email, password);
    res.status(201).json({ user, token });
    // const result = await authService.signupService(email, password);
    // res.status(201).json({ user: { id: result.user.id, email: result.user.email }, token: result.token });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const { user, token } = await authService.loginService(email, password);
    res.status(200).json({ user, token });
    // const result = await authService.loginService(email, password);
    // res.status(200).json({ user: { id: result.user.id, email: result.user.email }, token: result.token });
  } catch (err) {
    next(err);
  }
}

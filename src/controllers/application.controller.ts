import { Request, Response, NextFunction } from "express";
import * as appService from "../services/application.service";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createAppController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const payload = req.body;
    const created = await appService.createApplication(userId, payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function listAppsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const items = await appService.getApplications(userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getAppController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const id = Number(req.params.id);
    const item = await appService.getApplicationById(userId, id);
    if (!item) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateAppController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const id = Number(req.params.id);
    const payload = req.body;
    const updated = await appService.updateApplication(userId, id, payload);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteAppController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.userId;
    const id = Number(req.params.id);
    await appService.deleteApplication(userId, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
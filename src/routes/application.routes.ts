import { Router } from "express";
import {
  createAppController,
  listAppsController,
  getAppController,
  updateAppController,
  deleteAppController
} from "../controllers/application.controller";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Apply auth middleware to all routes individually instead of using router.use()
router.post("/", requireAuth, createAppController);
router.get("/", requireAuth, listAppsController);
router.get("/:id", requireAuth, getAppController);
router.put("/:id", requireAuth, updateAppController);
router.delete("/:id", requireAuth, deleteAppController);

export default router;
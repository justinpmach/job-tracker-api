import { Router } from "express";
import {
  createAppController,
  listAppsController,
  getAppController,
  updateAppController,
  deleteAppController
} from "../controllers/application.controller";

import { requireAuth } from "../middleware/auth.middleware";
import { body, query, param } from "express-validator";
import { validateRequest } from "../middleware/validate.middleware";

const router = Router();

// Apply auth middleware to all routes individually instead of using router.use()
router.post(
  "/",
  requireAuth,
  [
    body("company").isString().notEmpty(),
    body("role").isString().notEmpty(),
    body("appliedDate").isISO8601(),
    body("status").optional().isIn(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]),
  ],
  validateRequest,
  createAppController
);
// router.post("/", requireAuth, createAppController);
router.get(
  "/",
  requireAuth,
  [
    query("status").optional().isIn(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]),
    query("company").optional().isString(),
    query("sortBy").optional().isIn(["appliedDate", "createdAt"]),
    query("order").optional().isIn(["asc", "desc"]),
  ],
  validateRequest,
  listAppsController
);
router.get("/:id", requireAuth, getAppController);
router.put("/:id", requireAuth, updateAppController);
router.delete("/:id", requireAuth, deleteAppController);

export default router;
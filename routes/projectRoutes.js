import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pictures", maxCount: 10 }
  ]),
  createProject
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pictures", maxCount: 10 }
  ]),
  updateProject
);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
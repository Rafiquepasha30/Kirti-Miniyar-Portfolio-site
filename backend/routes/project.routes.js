import { Router } from "express";
import Project from "../models/Project.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../utils/upload.js";
import path from "path";


const router = Router();

// Public
router.get("/", async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});
router.get("/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
});

// Admin CRUD
router.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  body.slug = body.slug || body.title.toLowerCase().replace(/\s+/g, "-");
  const created = await Project.create(body);
  res.json(created);
});

router.put("/:id", requireAuth, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.post("/upload", requireAuth, upload.single("image"), (req, res) => {
  // Always convert backslashes → forward slashes
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ url: filePath });
});

export default router;

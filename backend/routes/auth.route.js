import { Router } from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const router = Router();

// Seed one admin (one-time)
router.post("/seed", async (req, res) => {
  const { email, password } = req.body;
  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: "Admin exists" });
  await Admin.create({ email, password });
  res.json({ message: "Admin created" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true, // set true in production (HTTPS)
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.json({ message: "Logged in", email });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Me
router.get("/me", (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.json({ authenticated: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, email: decoded.email });
  } catch {
    res.json({ authenticated: false });
  }
});

export default router;

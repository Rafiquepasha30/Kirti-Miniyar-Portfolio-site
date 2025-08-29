import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://kirti-miniyar-portfolio-site-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true
  })
);

app.get("/", (_req, res) => res.send("API OK"));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
  );
});

import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from "./routes/authRoutes";
import spotifyRoutes from "./routes/spotifyRoutes";
import followsRouter from "./routes/followsRouter";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import multer from "multer";
import { supabase } from "./supabase";
import { decode } from "base64-arraybuffer";
import { authenticateJWT } from "./middleware/jwtAuth";
import pool from "./config/database-connection";

import { AuthenticatedRequest } from "./authRequestInterface";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api', followsRouter);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files allowed"));
    cb(null, true);
  }
});

app.post("/api/users/avatar", authenticateJWT, upload.single("file"), async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File missing" });

    const file = req.file;
    const ext = (file.originalname.split(".").pop() || "png").toLowerCase();
    if (!["png","jpg","jpeg","webp"].includes(ext)) {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const pathName = `avatars/${req.user.id}-${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(pathName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ error: "Upload to storage failed" });
    }

    const { data: pub } = supabase.storage.from("images").getPublicUrl(data.path);
    const publicUrl = pub.publicUrl;

    try {
      await pool.query("UPDATE fmuser SET avatarimage = $1 WHERE id = $2", [publicUrl, req.user.id]);
    } catch (dbErr: any) {
      console.error("DB update error:", dbErr);
      return res.status(500).json({ error: "DB update failed" });
    }

    return res.json({ avatarUrl: publicUrl });
  } catch (e: any) {
    console.error("General avatar error:", e);
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
});

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
  
  res.json({ 
    message: 'Backend funcionando via ngrok!', 
    timestamp: new Date(),
    ngrokUrl: 'https://crisp-crane-fully.ngrok-free.app',
    environment: process.env.NODE_ENV || 'development',
    headers: req.headers,
    origin: req.headers.origin
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Ngrok URL: https://crisp-crane-fully.ngrok-free.app`);
});




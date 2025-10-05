import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from "./routes/authRoutes";
import spotifyRoutes from "./routes/spotifyRoutes";
import followsRouter from "./routes/followsRouter";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api', followsRouter);


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




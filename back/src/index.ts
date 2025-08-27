import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Usar rotas de auth
app.use('/api/auth', authRoutes); // ← Todas as rotas de authRoutes vão ter prefixo /api/auth


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


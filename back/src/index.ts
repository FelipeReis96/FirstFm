import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import pool from "./config/database-connection";
import dotenv from 'dotenv';
import path from 'path';

// MUDANÇA AQUI: Ajustar o caminho para a raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debug
console.log('🔍 Variáveis carregadas do .env:', Object.keys(process.env).filter(key => key.includes('DATABASE')));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// Rota original
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

// Rota para testar Supabase
app.get("/api/test", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Conexão com Supabase OK!',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro na conexão',
      details: error.message 
    });
  }
});

// NOVA ROTA: Inserir usuário de teste na tabela fmuser
app.post("/api/test-user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'INSERT INTO fmuser (email, avatarImage) VALUES ($1, $2) RETURNING *',
      ['test@firstfm.com', 'https://avatars.githubusercontent.com/u/1?v=4']
    );
    
    res.json({ 
      message: 'Usuário inserido na tabela fmuser!',
      user: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao inserir usuário',
      details: error.message 
    });
  }
});

// NOVA ROTA: Listar todos os usuários da tabela fmuser
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM fmuser ORDER BY id DESC');
    res.json({ 
      message: 'Usuários da tabela fmuser:',
      users: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar usuários',
      details: error.message 
    });
  }
});

// NOVA ROTA: Login de usuário
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validar se email e password foram enviados
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar usuário no banco
    const result = await pool.query(
      'SELECT * FROM fmuser WHERE email = $1', 
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Usuário não encontrado' 
      });
    }

    const user = result.rows[0];

    // Por enquanto, login simples (sem hash de senha)
    // TODO: Implementar bcrypt para hash de senha
    if (user.password !== password) {
      return res.status(401).json({ 
        error: 'Senha incorreta' 
      });
    }

    // Login bem-sucedido
    res.json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        email: user.email,
        avatarimage: user.avatarimage
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


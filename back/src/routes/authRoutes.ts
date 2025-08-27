import { Router } from 'express';
import { Request, Response } from 'express';
import pool from '../config/database-connection';

const router = Router();

// Rota: POST /api/auth/login (o /api/auth vem do index.ts)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

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

    if (user.password !== password) {
      return res.status(401).json({ 
        error: 'Senha incorreta' 
      });
    }

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


router.post('/register', async (req: Request, res : Response) => {
  try {
  const {username, email, password} = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({error: 'Username, email e senha são obrigatórios'});
  }

  const result = await pool.query('INSERT INTO fmuser (username, email, password) VALUES ($1, $2, $3) RETURNING *',
  [username, email, password]);


  const user = result.rows[0];

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.status(201).json({
      message: 'Registro realizado com sucesso!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarimage: user.avatarimage
    }
  });
}
  catch (error) {
    console.error('Erro no registro:', error);
    if (error.code === '23505') { // Código de erro para violação de unicidade no PostgreSQL
      return res.status(400).json({ 
        error: 'Usuário já existe',
        details: error.message 
      });
    }
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
})

export default router;
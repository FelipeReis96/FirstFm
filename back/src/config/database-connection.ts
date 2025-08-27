import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// MUDANÇA AQUI: Ajustar o caminho para a raiz do projeto
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Debug para ver se carregou
console.log('🔍 DATABASE_URL encontrada:', !!process.env.DATABASE_URL);
console.log('📍 Valor:', process.env.DATABASE_URL?.substring(0, 30) + '...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Necessário para Supabase
  }
});

// Testar conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar com Supabase:', err.stack);
  } else {
    console.log('✅ Conectado ao Supabase!');
    release();
  }
});

export default pool;
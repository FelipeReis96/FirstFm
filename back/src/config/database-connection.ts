import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

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
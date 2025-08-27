'use client';
import { useState } from 'react';
import Link from 'next/link';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // ← Prevenir reload da página
        
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (response.ok) {
                alert('Login realizado com sucesso! 🎉');
                console.log('Login successful', data);
            } else {
                alert(`Erro: ${data.error || 'Falha no login'}`);
                console.error('Login failed', data);
            }

        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 h-[45vh] w-[35vh] rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="font-bold text-lg p-4 text-[30px]">Login</div>
            
            <form onSubmit={handleLogin} className="flex flex-col"> {/* ← onSubmit aqui */}
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    type="email" 
                    placeholder="Email" 
                    required
                    className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    type="password" 
                    placeholder="Password" 
                    required
                    className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" 
                />
                
                {/* BOTÃO SUBMIT */}
                <button 
                    type="submit" 
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                    Login
                </button>
            </form>
            
            <Link href="/register" className="mt-4 text-sm text-white hover:underline">
                Don&apos;t have an account? Register
            </Link>
        </div>
    )
}
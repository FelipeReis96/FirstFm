'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstPassword, setFirstPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json();
            if (response.ok ) {
                alert('Conta criada com sucesso! 🎉');
                window.location.href = '/login';
            } else {
                alert(`Erro: ${data.error || 'Falha no registro'}`);
            }
        }
        catch (error) {
            alert(`Erro: Falha no registro`);
            console.error('Register failed', error);
        }
    }



    return (
        <div className="flex flex-col justify-center items-center p-6 h-[45vh] w-[35vh] rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="font-bold text-lg p-4 text-[30px]">Sign up</div>
            <form onSubmit={handleRegister}
            className="flex flex-col">
                <input onChange={(e) => setUsername(e.target.value)} value={username}
                type="text" placeholder="Username" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <input onChange={(e) => setEmail(e.target.value)} value={email}
                type="text" placeholder="Email" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <input onChange={(e) => setFirstPassword(e.target.value)} value={firstPassword}
                type="password" placeholder="Password" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                <input onChange={(e) => setPassword(e.target.value)} value={password}
                type="password" placeholder="Confirm Password" className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all" />
                {firstPassword !== password && <span className="text-red-500 text-sm mb-2">Passwords do not match</span>}
                <button type="submit" className="p-2 bg-[var(--login-button-border)] text-white rounded">Register</button>
            </form>
            <Link href="/login" className="mt-4 text-sm text-white hover:underline">Already have an account? Login</Link>
        </div>
    )
}
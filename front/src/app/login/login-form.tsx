'use client';
import { useState } from 'react';
import Link from 'next/link';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (response.ok) {
                console.log('Login successful', data);
                
               
                localStorage.setItem('username', data.user.username);
                
                
                await connectSpotify(data.user.username);
                
            } else {
                alert(`Erro: ${data.error || 'Falha no login'}`);
                console.error('Login failed', data);
                setIsLoggingIn(false);
            }

        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error('Error logging in:', error);
            setIsLoggingIn(false);
        }
    };

    const connectSpotify = async (username: string) => {
        try {
            console.log('Conectando com Spotify para:', username);
            
            const response = await fetch(`http://localhost:4000/api/spotify/login?username=${username}`);
            const data = await response.json();
            
            if (response.ok) {
                window.location.href = data.authUrl;
            } else {
                alert('Erro ao conectar com Spotify, redirecionando para perfil...');
                window.location.href = `/user/${username}`;
            }
        } catch (error) {
            console.error('Erro ao conectar com Spotify:', error);
            alert('Erro de conexão com Spotify, redirecionando para perfil...');
            window.location.href = `/user/${username}`;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 h-[45vh] w-[35vh] rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="font-bold text-lg p-4 text-[30px]">Login</div>
            
            <form onSubmit={handleLogin} className="flex flex-col"> 
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    type="email" 
                    placeholder="Email" 
                    required
                    disabled={isLoggingIn}
                    className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all disabled:opacity-50" 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    type="password" 
                    placeholder="Password" 
                    required
                    disabled={isLoggingIn}
                    className="mb-2 p-2 rounded border border-white/30 bg-white/30 backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:border-white/60 focus:bg-white/40 transition-all disabled:opacity-50" 
                />
                
                <button 
                    type="submit" 
                    disabled={isLoggingIn}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded transition-colors"
                >
                    {isLoggingIn ? 'Conectando...' : 'Login'}
                </button>
            </form>
            
            <Link href="/register" className="mt-4 text-sm text-white hover:underline">
                Don&apos;t have an account? Register
            </Link>
        </div>
    )
}
'use client';
import { useEffect, useState } from 'react';

export default function SpotifyPage() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsConnecting(true);
    
    try {
      // Pegar o username do usuário logado no seu site
      const currentUsername = getCurrentUsername(); // implementar essa função
      
      const response = await fetch(`http://localhost:4000/api/spotify/login?username=${currentUsername}`);
      const data = await response.json();
      
      if (response.ok) {
        // Redireciona para o Spotify
        window.location.href = data.authUrl;
      } else {
        alert('Erro ao conectar com Spotify');
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão');
      setIsConnecting(false);
    }
  };

  // Exemplo de como você pode pegar o username atual
  function getCurrentUsername() {
      // Opção 1: Do localStorage
      return localStorage.getItem('username');
      
      // Opção 2: Do contexto/estado da aplicação
      // return user.username;
      
      // Opção 3: Da URL atual
      // return window.location.pathname.split('/').pop();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
        <h1 className="text-4xl font-bold text-white mb-6">
          🎵 FirstFm
        </h1>
        
        <p className="text-white/80 mb-8">
          Conecte sua conta do Spotify para começar
        </p>
        
        <button
          onClick={handleSpotifyLogin}
          disabled={isConnecting}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          {isConnecting ? 'Conectando...' : 'Conectar com Spotify'}
        </button>
      </div>
    </div>
  );
}
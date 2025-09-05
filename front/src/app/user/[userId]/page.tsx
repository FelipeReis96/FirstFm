'use client'
import { use, useState} from 'react';

import Header from '../../header/page';
import Hero from '../../hero/hero';
import RecentTracks from '../../components/recent-tracks';

export default function UserPage({ params }: { params: Promise<{ userId: string }> }) {

    const { userId } = use(params);
    const [isConnecting, setIsConnecting] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsConnecting(true);
    
    try {
      // Chama seu backend para pegar URL do Spotify
      const response = await fetch(`http://localhost:4000/api/spotify/login?username=${userId}`);
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
    return (
      <div className="flex flex-col">
          <div className="flex justify-center items-center flex-col">
            <Header />
            <Hero />
          </div>
          <div className="ml-3 mt-7 sm:mt-14 md:pl-30 lg:pl-80 mt-8">
            <RecentTracks userId={userId} />
          </div>
      </div>
    );
}
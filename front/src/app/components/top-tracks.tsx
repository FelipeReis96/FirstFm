'use client';
import { useEffect, useState } from 'react';

export default function TopTracks({ userId }: { userId: string }) {
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const handleTopTracks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/spotify/top-tracks/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setTopTracks(data);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };
    handleTopTracks();
  }, [userId]);

  return (
    <div className="text-foreground max-w-3xl">
      {topTracks && (topTracks as any).items && (
        <h1 className="text-2xl font-bold mb-4">Top Tracks</h1>
      )}
      <ul className="space-y-2">
        {topTracks && (topTracks as any).items && (topTracks as any).items.map((track: any, index: number) => (
          <li key={index} className="py-2">
            <div className="flex flex-row rounded-lg bg-card/40 border border-border p-3 hover:bg-card/60 transition-colors">
              <img
                src={track.album?.images?.[2]?.url || track.album?.images?.[0]?.url}
                alt={track.name}
                className="w-16 h-16 mr-4 rounded"
              />
              <div className="flex flex-col">
                <div className="font-semibold">{track.name}</div>
                <div className="text-sm text-muted-foreground">
                  {track.artists?.map((artist: any) => artist.name).join(', ')}
                </div>
                <div className="text-sm text-muted-foreground">{track.album?.name}</div>
              </div>
            </div>
            <hr className="border-border/60 mt-4 w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
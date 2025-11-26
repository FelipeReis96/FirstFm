//como o userId vem de um fetch feito no backend (assíncrono), precisamos Promise<{ userId: string }>
import { useEffect, useState } from 'react';

export default function RecentTracks({ userId }: { userId: string }) {
    const [recentTracks, setRecentTracks] = useState(null);
    
    useEffect(() => {
        const handleRecentTracks = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/spotify/recent-tracks/${userId}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                setRecentTracks(data);
            } catch (error) {
                console.error('Error fetching recent tracks:', error);
            }
        };
        handleRecentTracks();
    }, [userId]);

    return (
        <div className="text-foreground max-w-3xl">
            {recentTracks && recentTracks.items && (
                <h1 className="text-2xl font-bold mb-4">Recent Tracks</h1>
            )}
            <ul className="space-y-2">
                {recentTracks && recentTracks.items && recentTracks.items.map((item: RecentTrackItem, index: number) => (
                    <li key={index}>
                        <div className="flex flex-row rounded-lg bg-card/40 border border-border p-3 hover:bg-card/60 transition-colors">
                            <img src={item.track.album.images[2].url} alt={item.track.name} className="w-16 h-16 mr-4"/>
                            <div className="flex flex-col">
                                <div className="font-semibold">{item.track.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {item.track.artists.map((artist: Artist) => artist.name).join(', ')}
                                </div>
                                <div className="text-sm text-muted-foreground">{item.track.album.name}</div>
                            </div>
                        </div>
                        <hr className="border-border/60 mt-4 w-full"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
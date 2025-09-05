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
        <div className="text-black max-w-[100vh]">
            { recentTracks && recentTracks.items && (
            <h1 className="text-2xl font-bold mb-4">RECENT TRACKS</h1>
            )}
            <ul className="space-y-2">
            {recentTracks && recentTracks.items && recentTracks.items.map((item: RecentTrackItem, index: number) =>(
                <li key={index} className="">
                <div className="font-semibold">{item.track.name}</div>
                <div className="text-sm text-gray-600">{item.track.artists.map((artist: Artist) => artist.name).join(', ')}</div>
                <div>{item.track.album.name}</div>
                <hr className="border-gray-300 my-2 max-w-[100vh]"></hr>
                </li>
            ))}
            </ul>
        </div>
    );
}
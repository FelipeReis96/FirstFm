'use client';
import { useEffect, useState } from 'react';

export default function TopTracks({ userId }: { userId: string }) {
    const [topTracks, setTopTracks] = useState(null);

    useEffect(() => {
        const handleTopTracks = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/spotify/top-tracks/${userId}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
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
        <div className="text-black max-w-[100vh]">
            {topTracks && topTracks.items && (
                <h1 className="text-2xl font-bold mb-4">TOP TRACKS</h1>
            )}
            <ul className="space-y-2">
                {topTracks && topTracks.items && topTracks.items.map((track: any, index: number) => (
                    <li key={index} className="py-2">
                        <div className="flex flex-row">
                            <img 
                                src={track.album?.images?.[2]?.url || track.album?.images?.[0]?.url} 
                                alt={track.name} 
                                className="w-16 h-16 mr-4"
                            />
                            <div className="flex flex-col">
                                <div className="font-semibold">{track.name}</div>
                                <div className="text-sm text-gray-600">
                                    {track.artists?.map((artist: any) => artist.name).join(', ')}
                                </div>
                                <div>{track.album?.name}</div>
                            </div>
                        </div>
                        <hr className="border-gray-300 mt-4 w-full"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
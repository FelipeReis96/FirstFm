'use client';
import { useState, useEffect } from 'react';


export default function TopArtists({userId}: {userId: string}) {
    const [topArtists, setTopArtists] = useState(null);
    
    useEffect(() => {
        const handleTopArtists = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/spotify/top-artists/${userId}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                setTopArtists(data);
            } catch(error) {
                console.error('Error fetching top artists:', error);
            }
        }
        handleTopArtists();
    }, [userId])
    
    const firstArtist = topArtists?.items?.[0];

    return (
        <div className="text-black max-w-[100vh] mt-10">
            {topArtists && topArtists.items && (
                <h1 className="text-2xl font-bold ">TOP ARTISTS</h1>
            )}
            <div className="flex flex-row w-full py-6">
                <div className="w-1/2 h-full">
                    <img 
                        src={firstArtist?.images[0]?.url} 
                        alt={firstArtist?.name} 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="w-1/2 h-full grid grid-cols-2">
                    {topArtists && topArtists.items && topArtists.items.slice(1, 5).map((artist: any, index: number) => (
                        <div key={index} className="w-full ">
                            <img 
                                src={artist.images[0]?.url} 
                                alt={artist.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
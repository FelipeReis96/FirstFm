'use client';
import { useEffect, useState } from 'react';
import {authService} from '@/services/authService';
import {useRouter} from  "next/navigation";


export default function Follows() {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const handleFolloweePage = (user: string) => {
        router.push(`/user/${user}`);
    }

    useEffect(() => {
        handleFollows();
    }, []);

    const handleFollows = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/following', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authService.getToken(),
                }
            });

            if (!response.ok) {
                throw Error(`Erro: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json(); 
            console.log('Dados recebidos:', data);
            setFollowing(data); 
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-black max-w-[100vh]">
            <ul className="space-y-2">
                {following.map((user) => (
                    <li key={user.id}>
                        <div onClick={() => handleFolloweePage(user.username)}
                        className="flex flex-row">
                            <img src={user.avatarimage} alt={`${user.username}'s avatar`} className="w-10 h-10 rounded-full mr-2" />
                            <h3 className="ml-10 text-[21px] font-semibold">{user.username}</h3>
                        </div>
                        <hr className="border-gray-300 mt-4 w-full"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
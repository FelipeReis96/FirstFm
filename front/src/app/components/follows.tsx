'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { useRouter } from "next/navigation";


export default function Follows() {
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [followStatus, setFollowStatus] = useState<{ [id: string]: boolean }>({});
  const [updating, setUpdating] = useState<{ [id: string]: boolean }>({});
  const router = useRouter();
  const params = useParams();
  const profileUsername = params?.username as string; // 'lobo'

  useEffect(() => {
    handleFollows();
  }, [profileUsername]);

  // Busca lista de usuários seguidos pelo perfil visitado
  const handleFollows = async () => {
    try {
      const token = authService.getToken();
      const url = profileUsername
        ? `http://localhost:4000/api/following/${profileUsername}`
        : `http://localhost:4000/api/following`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) throw Error(`Error: ${response.status} - ${response.statusText}`);
      const data = await response.json();
      setFollowing(data);

      // Busca status de follow para cada usuário
      const statusObj: { [id: string]: boolean } = {};
      await Promise.all(data.map(async (user: any) => {
        try {
          const res = await fetch(`http://localhost:4000/api/status/${user.username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const status = await res.json();
            statusObj[user.id] = !!status.isFollowing;
          } else {
            statusObj[user.id] = false;
          }
        } catch {
          statusObj[user.id] = false;
        }
      }));
      setFollowStatus(statusObj);
    } catch (error) {
      console.error('Error fetching following:', error);
    } finally {
      setLoading(false);
    }
  };

  // Seguir/desseguir usuário
  const handleFollowToggle = async (user: any) => {
    setUpdating(prev => ({ ...prev, [user.id]: true }));
    try {
      const token = authService.getToken();
      const idResp = await fetch(`http://localhost:4000/api/users/getId/${user.username}`);
      if (!idResp.ok) return;
      const { id: followeeId } = await idResp.json();

      const method = followStatus[user.id] ? 'DELETE' : 'POST';
      const url = followStatus[user.id]
        ? 'http://localhost:4000/api/unfollow'
        : 'http://localhost:4000/api/follow';

      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ followeeId })
      });
      if (resp.ok) {
        setFollowStatus(prev => ({ ...prev, [user.id]: !prev[user.id] }));
      }
    } catch (error) {
      // erro silencioso
    } finally {
      setUpdating(prev => ({ ...prev, [user.id]: false }));
    }
  };

  return (
    <div className="max-w-3xl text-foreground">
      {loading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-16 rounded-lg bg-card/30 border border-border/40"
            />
          ))}
        </div>
      )}
      {!loading && (
        <ul className="space-y-3">
          {following.map((user) => (
            <li key={user.id}>
              <div
                className="flex items-center gap-4 p-3 rounded-lg bg-card/40 border border-border hover:bg-card/60 transition-colors group"
              >
                <img
                  src={user.avatarimage || '/hollow.png'}
                  alt={`${user.username}'s avatar`}
                  className="w-12 h-12 rounded-full object-cover border border-border/60 group-hover:border-primary/50 transition-colors"
                />
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-semibold leading-none">
                    {user.username}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Following
                  </span>
                </div>
                <button
                  onClick={() => handleFollowToggle(user)}
                  disabled={updating[user.id]}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    followStatus[user.id]
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {followStatus[user.id] ? 'Unfollow' : 'Follow'}
                </button>
              </div>
              <hr className="border-border/60 mt-3" />
            </li>
          ))}
          {following.length === 0 && (
            <p className="text-sm text-muted-foreground">No follows found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
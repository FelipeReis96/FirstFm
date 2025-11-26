'use client';
import { useState, useEffect } from 'react';
import Avatar from "../components/avatar";
import{useRouter, usePathname} from 'next/navigation';
import { userAtom, isAdmin} from '../atoms/user.atoms';
import { useAtomValue, useSetAtom } from 'jotai';

export default function Hero() {
  const [avatarSize, setAvatarSize] = useState(180);
  const router = useRouter();
  const user = useAtomValue(userAtom);
  //const isUserAdmin = useAtomValue(isAdmin);
  const pathname = usePathname();
  const slugs = pathname.split('/');
  console.log('Slugs:', slugs);
  const userFromPath = slugs[2];

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!userFromPath || user?.username === userFromPath) {
        setIsFollowing(null);
        return;
      }
      const token = localStorage.getItem('jwt_token');
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:4000/api/status/${userFromPath}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          setIsFollowing(null);
          return;
        }
        const data = await response.json();
        setIsFollowing(!!data.isFollowing);
      } catch {
        setIsFollowing(null);
      }
    };
    run();
  }, [userFromPath, user?.username]);
  
  const handleFollowUser = async () => {
    const token = localStorage.getItem('jwt_token');
    if (!token || !userFromPath || user?.username === userFromPath) return;
    try {
      const userId = await fetch(`http://localhost:4000/api/users/getId/${userFromPath}`);
      const userIdData = await userId.json();
      if (!isFollowing) {
        const response = await fetch('http://localhost:4000/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ followeeId: userIdData.id }),
      });
      console.log('FOLLOWWWW');
      setIsFollowing(prev => !prev);
      } else {
        const response = await fetch('http://localhost:4000/api/unfollow', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ followeeId: userIdData.id }),
        });
        setIsFollowing(prev => !prev);
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
  }

  const seeFollowing = () => {
    router.push(`/user/${user?.username}/following`);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {        
        setAvatarSize(90);
        } else if (window.innerWidth < 1024) {
        setAvatarSize(150);
        
      } else {
        setAvatarSize(180);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[15vh] h-[20vh] sm:h-[30vh] border-b border-gray-300 mt-10">
      <section className=" w-full h-[10vh] sm:h-[18vh] w-full bg-gradient-to-br from-[var(--a)] via-[var(--b)] to-[var(--c)] flex justify-start items-start">
        <div className="flex justify-center items-center"></div>
      <div className="ml-3 mt-7 sm:mt-14 md:pl-30 lg:pl-80 flex flex-row w-auto">
        <Avatar src={user?.avatarimage} alt="User Avatar" size={avatarSize} />
        <div className=" ml-5 mt-5 font-bold text-[21px] h-auto">
          {userFromPath}
          <div onClick={seeFollowing}
          className="mt-4 font-normal relative group cursor-pointer">
            <span className="relative">
              Following
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>
          {user?.username !== userFromPath && user && isFollowing !== null && (
            <button
              onClick={handleFollowUser}
              className={`mt-4 rounded-full px-4 py-1 text-sm font-medium ${
                isFollowing ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </section>
    </div>
    
  );
}
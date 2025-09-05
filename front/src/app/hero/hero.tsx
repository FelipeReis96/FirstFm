'use client';
import { useState, useEffect } from 'react';
import Avatar from "../components/avatar";

export default function Hero() {
  const [avatarSize, setAvatarSize] = useState(180);

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
    <div className="w-full h-[15vh] h-[20vh] sm:h-[30vh] border-b border-gray-300 ">
      <section className=" w-full h-[10vh] sm:h-[18vh] w-full bg-gradient-to-br from-[var(--a)] via-[var(--b)] to-[var(--c)] flex justify-start items-start">
      <div className="ml-3 mt-7 sm:mt-14 md:pl-30 lg:pl-80 flex flex-row">
        <Avatar src="/hollow.png" alt="User Avatar" size={avatarSize} />
        <div className="ml-10 mt-5 font-bold text-[21px]"> AAAAAAA</div>
      </div>
    </section>
    <div className="flex justify-center items-center text-black mt-5 font-bold">
        ABOUT ME 
      </div>
    </div>
    
  );
}
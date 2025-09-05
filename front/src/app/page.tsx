"use client";
import Header from './header/page';
import Hero from './hero/hero';
import RecentTracks from './components/recent-tracks';

export default function Home() {

  return (
    <div>
    <div className="flex justify-center items-center flex-col">
      <Header />
      <Hero />
    </div>
    <div className="fixed left-0 -mt-[12vh] ml-[30vh] flex items-center">
     
    </div>
  </div>
  )
}


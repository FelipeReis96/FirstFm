"use client";
import Header from './header/page';
import Avatar from './components/avatar';
import Hero from './hero/hero';

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <Header />
      <Hero />
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 ml-6 flex items-center">
        <Avatar src="/hollow.png" alt="User Avatar" size={180} />
      </div>
    </div>
  )
}


"use client";
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <main>
      <div className="w-full h-[7vh] bg-black flex items-center fixed top-0 right-0 left-0">
        <h1 className="text-white text-3xl font-bold ml-4">First.Fm</h1>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search friends"
              className="pl-10 pr-4 py-2 text-white rounded-full border border-gray-700 focus:outline-none focus:border-white w-96"
            />
        </div>
        <div className="absolute right-4 flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">Your profile</Link>
        </div>
      </div>
    </main>
  )
}
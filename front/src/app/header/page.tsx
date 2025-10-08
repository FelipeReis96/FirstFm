"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full px-10 py-6 flex justify-between items-center border-b border-neutral-700 bg-neutral-900 z-10">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-wide text-white">Firstfm</h1>
      </Link>

     

      <div className="space-x-4 text-sm">
        <Link href="/login">
          <button className="px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 rounded-full bg-teal-500 text-black hover:bg-teal-400 transition">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
}

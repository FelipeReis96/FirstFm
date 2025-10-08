"use client";
import Header from "./header/page";
import Hero from "./hero/hero";


export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans overflow-hidden">
      <Header />
      <section className="px-10 pt-28 pb-16 text-left max-w-6xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Professional Sounds. <br />
          Underground Vibes.
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mb-8">
          Discover raw, independent music from the studio that empowers emerging artists.
        </p>
        <button className="bg-teal-500 hover:bg-teal-400 text-black px-6 py-3 rounded-full font-semibold transition">
          Listen to Latest Release
        </button>
      </section>

      {/* Waveform Divider */}
      <div className="w-full h-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10" />

     
  
    </div>
  );
}
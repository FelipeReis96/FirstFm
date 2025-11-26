"use client";
import Header from "./header/page";
import Hero from "./hero/hero";
import Hero1 from "./hero/hero1";
import Footer from "./components/ui/footer";



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Hero1/>
      <Footer />
    </div>
  );
}
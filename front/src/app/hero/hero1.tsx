import { Button } from "../components/ui/button";
import { Music, TrendingUp, Users } from "lucide-react";


const Hero1 = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={"/hero-bg.jpg"} 
          alt="FirstFM Hero Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
            <Music className="w-6 h-6 text-primary" />
            <span className="text-md text-muted-foreground">
              Your Spotify stats in real time
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Discover your{" "}
            <span className="text-primary bg-gradient-primary bg-clip-text text-transparent">
              Musical DNA
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            FirstFM analyzes your most played songs, albums and artists. 
            See detailed statistics and uncover your listening habits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button 
              variant="outlinePrimary" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = '/register'}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero1;
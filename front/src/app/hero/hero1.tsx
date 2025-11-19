import { Button } from "../components/ui/button";
import { Music, TrendingUp, Users } from "lucide-react";


const Hero1 = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={"@/assets/hero-bg.jpg"} 
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
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Suas estatísticas do Spotify em tempo real
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Descubra seu{" "}
            <span className="text-primary bg-gradient-primary bg-clip-text text-transparent">
              DNA Musical
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            FirstFM analisa suas músicas, álbuns e artistas mais tocados no Spotify. 
            Veja suas estatísticas detalhadas e descubra seus hábitos musicais.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = '/login'}
            >
              Conectar com Spotify
            </Button>
            <Button 
              variant="outlinePrimary" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.location.href = '/register'}
            >
              Criar Conta
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="text-3xl font-bold">50+</span>
              </div>
              <p className="text-muted-foreground">Top Tracks</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Music className="w-5 h-5" />
                <span className="text-3xl font-bold">100+</span>
              </div>
              <p className="text-muted-foreground">Artistas Favoritos</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="text-3xl font-bold">10k+</span>
              </div>
              <p className="text-muted-foreground">Usuários Ativos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero1;
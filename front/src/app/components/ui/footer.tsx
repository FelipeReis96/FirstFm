import { Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FirstFM</span>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © 2024 FirstFM. Suas estatísticas musicais do Spotify.
          </p>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
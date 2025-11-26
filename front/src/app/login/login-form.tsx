'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userAtom } from '../atoms/user.atoms';
import { useSetAtom } from 'jotai';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Music, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import {authService} from '@/services/authService';

// Validation schema (zod)
const loginSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Invalid email" })
    .max(255, { message: "Email too long" }),
  password: z.string()
    .min(3, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password too long" })
});

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const setUser = useSetAtom(userAtom);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                alert(`Erro: ${data.error || 'Falha no login'}`);
                return;
            }

            authService.setToken(data.token);

            const meRes = await fetch('http://localhost:4000/api/users/me', {
                headers: { Authorization: `Bearer ${data.token}` }
            });
            if (!meRes.ok) {
                throw new Error('Falha ao obter /me');
            }
            const me = await meRes.json();

            setUser({
                id: me.id,
                username: me.username,
                email: me.email,
                role: me.role,
                avatarimage: me.avatarimage
            });
            if (!me.spotifyConnected) {
                await connectSpotify(me.username);
                console.log('SPOTIFY AAAAAAAAAAAAAAAAAA');
            }
            else {
                router.push(`/user/${me.username}`);
            }
            
        } catch (err) {
            console.error('Erro no login:', err);
            alert('Erro de conexão com o servidor');
        } finally {
            setIsLoggingIn(false);
        }
    };

  const connectSpotify = async (username: string) => {
    try {
      const resp = await fetch(`http://localhost:4000/api/spotify/login?username=${encodeURIComponent(username)}`);
      const data = await resp.json();
      if (resp.ok && data.authUrl) {
        router.push(data.authUrl);
      } else {
        router.push(`/user/${username}`);
      }
    } catch {
      router.push(`/user/${username}`);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-hero ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md p-8 bg-gradient-card border-border/50 shadow-card">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to FirstFM</h1>
          <p className="text-muted-foreground text-center">
            Sign in to view your music stats
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.email ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.password ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:text-primary-glow font-medium transition-colors">
              Create account
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}

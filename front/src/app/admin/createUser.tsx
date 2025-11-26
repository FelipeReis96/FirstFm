'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Music, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// Schema de validação
const registerSchema = z.object({
  username: z.string()
    .trim()
    .min(3, { message: "Username must have at least 3 characters" })
    .max(50, { message: "Username too long" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Only letters, numbers and underscore" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email" })
    .max(255, { message: "Email too long" }),
  password: z.string()
    .min(6, { message: "Password must have at least 6 characters" })
    .max(100, { message: "Password too long" }),
  confirmPassword: z.string()
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    // Validação client-side
    const result = registerSchema.safeParse({ username, email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsRegistering(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: result.data.username,
          email: result.data.email,
          password: result.data.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Account created! Please sign in.');
        router.push('/login');
      } else {
        toast.error(data.error || 'Failed to create account');
        setIsRegistering(false);
      }
    } catch {
      toast.error('Server connection error');
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-hero ">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <Card className="w-full max-w-md p-8 bg-gradient-card border-border/50 shadow-card">
        {/* Logo e Título */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isRegistering}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.username ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username}</p>
            )}
          </div>

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
              disabled={isRegistering}
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
              disabled={isRegistering}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.password ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isRegistering}
              className={`bg-background/50 border-border/50 focus:border-primary ${
                errors.confirmPassword ? 'border-destructive' : ''
              }`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
        
      </Card>
    </div>
  );
};

export default CreateUser;
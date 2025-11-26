import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { 
    id: string;
    role?: string;
    username: string;
    spotifyConnected?: boolean;
    email?: string;
    avatarimage?: string;
  };
}
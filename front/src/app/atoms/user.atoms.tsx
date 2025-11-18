import { atom } from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import {authService}  from '@/services/authService';

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role: string;
}

export const userAtom = atomWithStorage<UserInfo | null>('app_user', null);

export const isAdmin = atom((get) => get(userAtom)?.role === 'admin');

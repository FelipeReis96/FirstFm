'use client';
import { Provider, useSetAtom } from 'jotai';
import {userAtom} from './atoms/user.atoms';
import { authService } from '../services/authService';
import {useEffect} from 'react';

function Hydrator() {
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      // Sem token => garante que o user não persiste como admin
      setUser(null);
    }
  }, [setUser]);
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Hydrator />
      {children}
    </Provider>
  );
}
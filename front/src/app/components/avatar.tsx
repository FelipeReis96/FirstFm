'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState, } from 'react';
import {
  FaGear,
 
} from "react-icons/fa6";
import { authService} from "../../services/authService";

interface IAvatarProps {
  src: string;
  alt: string;
  size: number;
  redirect?: string;     // se openActions=false, clicar no avatar navega
  openActions?: boolean; // se true, abre o menu abaixo do avatar
  name?: string;
  email?: string;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export default function Avatar({
  src,
  alt,
  size,
  redirect,
  openActions = false,
  name,
  email,
  isAdmin,
  onLogout,
}: IAvatarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleAvatarClick = () => {
    if (openActions) {
      setOpen((v) => !v);
    } else if (redirect) {
      router.push(redirect);
    }
  };

  const handleLogout = () => {
    try {
      authService.clearSession();
      localStorage.clear();
    } catch {}
    onLogout?.();
    router.replace('/login');
  };

  return (
    <div className="relative inline-block">
      <div
        ref={btnRef}
        onClick={handleAvatarClick}
        className={openActions ? 'cursor-pointer' : redirect ? 'cursor-pointer' : undefined}
        aria-haspopup={openActions ? 'menu' : undefined}
        aria-expanded={openActions ? open : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>

      {openActions && open && (
        <div
          ref={panelRef}
          role="menu"
          className="
            absolute right-0 top-[calc(100%+8px)]
            w-72 z-50 rounded-2xl bg-white text-black
            shadow-xl border border-black/10
            dark:bg-neutral-900 dark:text-neutral-100 dark:border-white/10
          "
        >
          {/* Cabeçalho com nome/email */}
          <div className="p-4 border-b border-black/10 dark:border-white/10">
            {(name || email) && (
              <div className="flex items-center gap-3">
                <Image
                  src={src}
                  alt={alt}
                  width={40}
                  height={40}
                  className="rounded-full"
                  onClick={() => router.push(`/user/${name}`)}
                />
                <div className="min-w-0">
                  {name && <div className="font-semibold truncate">{name}</div>}
                  {email && (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                      {email}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="py-2">
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push('/admin');
                }}
                className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5v1h1a3 3 0 0 1 3 3v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-6a3 3 0 0 1 3-3h1V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3z"/></svg>
                Admin
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push('/settings');
              }}
              className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
            >
              <FaGear size={18}/>
              Settings
            </button>

            <hr className="my-2 border-black/10 dark:border-white/10" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H9a2 2 0 0 0-2 2v3h2V5h10v14H9v-3H7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/></svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
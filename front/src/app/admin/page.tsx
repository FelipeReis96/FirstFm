"use client";
import { authService } from "@/services/authService";
import Header from "../header/page";
import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { TrashIcon } from '@heroicons/react/24/outline';
import CreateUser from "./createUser";


interface User {
  id: string;
  username: string;
  role: string;
  email?: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGetUsers = async () => {
    try {
      setError(null);
      const token = authService.getToken();
      if (!token) {
        setError("Sem token. Faça login.");
        setUsers(null);
        return;
      }
      const response = await fetch("http://localhost:4000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const text = await response.text();
        console.log("Erro fetch users:", response.status, text);
        if (response.status === 401) setError("Not authenticated");
        else if (response.status === 403) setError("Not authorized (not admin)");
        else setError("Error fetching users");
        setUsers(null);
        return;
      }
      const usersData: User[] = await response.json();
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Erro inesperado");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/user/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      if (!response.ok) {
        const text = await response.text();
        console.log("Error deleting user:", response.status, text);
        if (response.status === 401) setError("Not authenticated");
        else if (response.status === 403) setError("Not authorized (not admin)");
        else setError("Error deleting user");
        return;
      }
      setUsers(prev => prev?.filter(u => u.id !== userId) || null);
    } catch (error){
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => { handleGetUsers(); }, []);

  return (
    <div className="h-full">
      <Header />
      <div className="mt-24 flex justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-primary bg-clip-text text-transparent">
          USERS
        </h1>
      </div>


      {error && (
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        {users && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl px-4">
            {users.map((u) => (
              <li
                key={u.id}
                className="group rounded-lg p-4 bg-card/40 border border-border text-foreground shadow-card hover:bg-card/60 transition-colors cursor-pointer"
                onClick={() => router.push(`/user/${u.username}`)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{u.username}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    {u.role}
                  </span>
                  <TrashIcon
                    className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(u.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <CreateUser />
      </div>

    </div>
  );
}
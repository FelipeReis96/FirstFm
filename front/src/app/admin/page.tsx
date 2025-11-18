"use client";
import { authService } from "@/services/authService";
import Header from "../header/page";
import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { TrashIcon } from '@heroicons/react/24/outline';


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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      if (!response.ok) {
        const text = await response.text();
        console.log("Error deleting user:", response.status, text);
        if (response.status === 401) setError("Not authenticated");
        else if (response.status === 403) setError("Not authorized (not admin)");
        else setError("Error deleting user");
        return;
      }
      setUsers((prevUsers) => prevUsers?.filter((user) => user.id !== userId) || null);
    } catch (error){
      console.error('Error deleting user:', error);
    }
  }

  useEffect(() => {
    handleGetUsers();
  },[]);

  return (
    <div className="h-full">
      <Header />
      <div className="flex mt-30 text-3xl text-black justify-center">
          USERS
      </div>
      <div className="mt-10 flex justify-center">
          {users && (
            <ul className="grid grid-cols-2 gap-y-4 text-black gap-x-5 w-1/2">
              {users.map((u) => (
                <li key={u.id} className="bg-white/70 rounded-md py-2 shadow p-4"
                onClick = {() => router.push(`/user/${u.username}`)}>
                  {u.username}  ({u.role})
                  <TrashIcon 
                    className="h-5 w-5 inline ml-4 text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(u.id);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
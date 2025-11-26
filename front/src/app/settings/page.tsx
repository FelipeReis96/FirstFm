'use client';
import Header from "../header/page";
import Avatar from "../components/avatar";
import { userAtom, isAdmin } from '../atoms/user.atoms';
import { useAtomValue, useSetAtom } from 'jotai';


export default function SettingsPage() {
  const user = useAtomValue(userAtom);
  const admin = useAtomValue(isAdmin);
  const setUser = useSetAtom(userAtom);

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);

      // ajuste se sua chave real for jwt_token
      const token = localStorage.getItem('jwt_token');
      if (!token) return;

      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const resp = await fetch(`${apiBase}/api/users/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!resp.ok) {
        console.error('Upload failed', resp.status);
        return;
      }

      const data = await resp.json();
      const url = data.avatarUrl || data.imageUrl;
      if (url) {
        setUser(prev => prev ? { ...prev, avatarimage: url } : prev);
      }
    } catch (e) {
      console.error('Error uploading image:', e);
    }
  }

  return (
    <div className="h-full">
      <Header />
      <div className="flex mt-30 text-4xl text-black justify-center text-white">
        Settings
      </div>
      <div className="mt-10 flex flex-col justify-center items-center text-white">
        <div className="mb-5 text-2xl ">
          Your Photo
        </div>
        <Avatar
          size={200}
          src={user?.avatarimage || "/hollow.png"}
          alt={user?.username ?? ''}
        />
        <label
          htmlFor="avatar-file"
          className="mt-10 mb-10 inline-block bg-red-500 p-2 rounded text-white cursor-pointer"
        >
          Choose Photo
        </label>
        <input
          id="avatar-file"
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
        />

        {/* Informações do usuário */}
        <div className="mt-8 w-full max-w-sm bg-card/40 border border-border rounded-lg p-6 text-foreground shadow-card">
          <h2 className="text-xl font-bold mb-4">Your Info</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Username:</span>
              <span className="ml-2">{user?.username}</span>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <span className="ml-2">{user?.email}</span>
            </div>
            <div>
              <span className="font-medium">Role:</span>
              <span className="ml-2">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

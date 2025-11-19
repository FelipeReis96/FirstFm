'use client';
import Header from "../header/page";
import Avatar from "../components/avatar";
import { userAtom, isAdmin} from '../atoms/user.atoms';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

export default function SettingsPage() {
    const user = useAtomValue(userAtom);
    const admin = useAtomValue(isAdmin);
    

    return (
        <div className="h-full">
            <Header />
            <div className="flex mt-30 text-4xl text-black justify-center">
                Settings
            </div>
            <div className="mt-10 flex flex-col justify-center items-center ">
                <div className="mb-5 text-black text-2xl">
                    Your Photo
                </div>
                <Avatar
                size={200}
                src={"/hollow.png"}
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
                  //onChange={uploadImage}
                  className="hidden"
                />    
            </div>
        </div>
    )
}

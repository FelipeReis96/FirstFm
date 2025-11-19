"use client";
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Avatar from '../components/avatar';
import { useState, useEffect, useRef } from 'react';
import { userAtom, isAdmin} from '../atoms/user.atoms';
import { useAtomValue } from 'jotai';
  


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const isUserAdmin = useAtomValue(isAdmin);
  const userJotai = useAtomValue(userAtom);

  // Detect clicks outside the search results to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm && searchTerm.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm || searchTerm.length < 2) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const response = await fetch(`http://localhost:4000/api/users/search?searchTerm=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Search results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToUser = (username: string) => {
    router.push(`/user/${username}`);
    setSearchTerm("");
    setShowResults(false);
  };

  console.log("IS ADMIN HEADER:", isUserAdmin);

  return (
    <main>
      <div className="w-full bg-black flex items-center fixed top-0 right-0 left-0 h-[7vh] z-50">
        <h1 className="text-white text-3xl font-bold ml-4">First.Fm</h1>
        {(pathname !== '/login' && pathname !== '/register' && pathname !== '/') && (
          <>
            <div className="absolute left-1/2 transform -translate-x-1/2" ref={searchRef}>
              <Search className="hidden sm:block absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search friends"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && searchTerm.length >= 2 && setShowResults(true)}
                className="hidden sm:block pl-10 pr-4 py-2 text-white rounded-full border border-gray-700 focus:outline-none focus:border-white w-96"
              />
              
              {/* Search results */}
              {showResults && (
                <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-400">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map(user => (
                      <div
                        key={user.username}
                        onClick={() => navigateToUser(user.username)}
                        className="flex items-center p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800"
                      >
                        <Avatar 
                          src={user.avatarimage || "/hollow.png"} 
                          alt={user.username} 
                          size={32}

                        />
                        <span className="ml-2 text-white">{user.username}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">No users found</div>
                  )}
                </div>
              )}
            </div>
            <div className="absolute right-4 flex items-center space-x-4">
              {userJotai && (<Avatar
                src="/hollow.png"
                alt="User Avatar"
                size={40}
                openActions
                name={userJotai?.username}
                email={userJotai?.email}
                isAdmin={isUserAdmin}
                
    
              />)}
            </div>
          </>
        )}
      </div>
      
    </main>
  );
}


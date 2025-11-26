'use client'
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Avatar from '../components/avatar';
import { useState, useEffect, useRef } from 'react';
import { userAtom, isAdmin } from '../atoms/user.atoms';
import { useAtomValue } from 'jotai';
import { Input } from '../components/ui/input';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isUserAdmin = useAtomValue(isAdmin);
  const userJotai = useAtomValue(userAtom);


  // Detect clicks outside the search results to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
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

  return (
    <header className="w-full bg-card border-b border-border fixed top-0 right-0 left-0 h-16 z-50 backdrop-blur-sm">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <h1 
          className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
          onClick={() => router.push('/')}
        >
          First.Fm
        </h1>
        
        {(pathname !== '/login' && pathname !== '/register' && pathname !== '/') && (
          <>
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text" 
                  placeholder="Search friends"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm && searchTerm.length >= 2 && setShowResults(true)}
                  className="pl-10 pr-4 bg-secondary border-border focus:border-primary"
                />
              </div>
              
              {/* Search results */}
              {showResults && (
                <div className="absolute mt-1 w-full bg-card border border-border rounded-lg shadow-glow max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-muted-foreground">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((user: any) => (
                      <div
                        key={user.username}
                        onClick={() => navigateToUser(user.username)}
                        className="flex items-center p-3 hover:bg-secondary cursor-pointer border-b border-border last:border-0 transition-colors"
                      >
                        <Avatar 
                          src={user.avatarimage || "/hollow.png"} 
                          alt={user.username} 
                          size={32}
                        />
                        <span className="ml-2 text-foreground">{user.username}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">No users found</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {userJotai && (
                <Avatar
                  src={userJotai.avatarimage || "/hollow.png"}
                  alt="User Avatar"
                  size={40}
                  openActions
                  name={userJotai.username}
                  email={userJotai.email}
                  isAdmin={isUserAdmin}
                />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}



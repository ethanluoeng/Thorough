import "../App.css"
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Helper to highlight the active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="h-12 w-full flex items-center px-8 backdrop-blur-md sticky top-0 z-50">
      {/* Left: brand */}
      <div className="flex items-center">
        <span className="text-white font-bold tracking-widest text-sm">Thorough</span>
      </div>

      {/* Centre: main navigation */}
      <div className="flex flex-1 justify-center gap-10">
        <Link 
          to="/" 
          className={`text-xs font-medium uppercase tracking-widest transition-colors ${
            isActive('/') ? 'text-amber-800' : 'text-amber-600 hover:text-white'
          }`}
        >
          Study
        </Link>
        <Link 
          to="/settings" 
          className={`text-xs font-medium uppercase tracking-widest transition-colors ${
            isActive('/settings') ? 'text-amber-800' : 'text-amber-600 hover:text-white'
          }`}
        >
          Settings
        </Link>
      </div>

      {/* Right: tagline */}
      <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">
        Time to Lock the Fck In!
      </div>
    </nav>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, LogOut, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between ${
        isScrolled ? 'bg-[var(--nav-bg)] shadow-lg backdrop-blur-md border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-playfix-red text-2xl md:text-3xl font-extrabold tracking-wider drop-shadow-[0_0_10px_rgba(229,9,20,0.5)]">
            PLAYFIX
          </Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/" className="relative group hover:text-playfix-red transition-colors py-1">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-playfix-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/tv-shows" className="relative group hover:text-playfix-red transition-colors py-1">
              TV Shows
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-playfix-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/movies" className="relative group hover:text-playfix-red transition-colors py-1">
              Movies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-playfix-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          <motion.button 
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            className="hover:text-playfix-red transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" /> : <Moon className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />}
          </motion.button>

          {user ? (
            <div className="group relative flex items-center cursor-pointer">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-full bg-playfix-red flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(229,9,20,0.5)]"
              >
                {user.username.charAt(0).toUpperCase()}
              </motion.div>
              {/* Dropdown */}
              <div className="absolute right-0 top-8 mt-2 w-48 bg-white dark:bg-[#1a1a1a]/90 backdrop-blur-md rounded-md shadow-2xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200 dark:border-white/10">
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200 dark:border-white/10">
                  Signed in as <br/><strong className="text-black dark:text-white">{user.username}</strong>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center"><Settings className="w-4 h-4 mr-2"/> Admin Dashboard</div>
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <div className="flex items-center"><LogOut className="w-4 h-4 mr-2"/> Sign out</div>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-playfix-red to-purple-600 text-white px-5 py-2 rounded font-bold hover:from-playfix-red-hover hover:to-purple-500 transition shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(true)} className="text-white hover:text-playfix-red transition-colors p-2">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-lg shadow-2xl z-[70] border-l border-white/10 flex flex-col pt-20 px-6 md:hidden"
            >
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col space-y-6 text-lg font-semibold text-white">
                <Link to="/" className="hover:text-playfix-red transition-colors py-2 border-b border-white/10">Home</Link>
                <Link to="/tv-shows" className="hover:text-playfix-red transition-colors py-2 border-b border-white/10">TV Shows</Link>
                <Link to="/movies" className="hover:text-playfix-red transition-colors py-2 border-b border-white/10">Movies</Link>
                
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span>Theme</span>
                  <button onClick={toggleTheme} className="text-playfix-red">
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>

                {user ? (
                  <>
                    <div className="py-2 text-sm text-gray-400">
                      Signed in as <span className="text-white font-bold">{user.username}</span>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="hover:text-playfix-red transition-colors py-2 border-b border-white/10 flex items-center">
                        <Settings className="w-5 h-5 mr-3"/> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="text-left hover:text-playfix-red transition-colors py-2 flex items-center">
                      <LogOut className="w-5 h-5 mr-3"/> Sign out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-gradient-to-r from-playfix-red to-purple-600 text-white text-center px-5 py-3 rounded-md font-bold shadow-lg mt-4">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

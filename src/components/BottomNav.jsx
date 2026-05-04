import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'My List', path: '/watchlist', icon: List },
    { name: 'Downloads', path: '/downloads', icon: Download },
  ];

  return (
    <nav className="fixed bottom-0 w-full md:hidden z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.name} to={item.path} className="flex flex-col items-center flex-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-300 ${
                  isActive ? 'text-playfix-red' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`relative ${isActive ? 'drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]' : ''}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? 'font-bold' : ''}`}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';
import { SkeletonHero } from './Skeleton';
import { mockMovies } from '../services/mockData';
import HeroActions from './HeroActions';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setMovie(mockMovies[Math.floor(Math.random() * mockMovies.length)]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !movie) {
    return <SkeletonHero />;
  }

  return (
    <header className="relative h-[85vh] md:h-[85vh] text-white overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center md:bg-top"
        style={{ backgroundImage: `url("${movie.thumbnailUrl}")` }}
      />
      {/* Stronger gradient on mobile to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-black/80 md:via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black/80 via-black/40 to-transparent hidden md:block" />
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col justify-end md:justify-center h-full px-6 md:px-12 w-full md:w-2/3 lg:w-1/2 pb-16 md:pb-0 md:pt-20"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold pb-2 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
          {movie.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-2 mt-6 md:mt-8 w-full sm:w-auto">
          <Link to={`/movie/${movie._id}`} className="w-full sm:w-auto">
            <Button variant="primary" className="w-full py-3 md:py-2 text-lg md:text-base">
              <Play className="w-6 h-6 md:w-5 md:h-5 mr-2 fill-current" /> Play
            </Button>
          </Link>
          <Link to={`/movie/${movie._id}`} className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full py-3 md:py-2 text-lg md:text-base">
              <Info className="w-6 h-6 md:w-5 md:h-5 mr-2" /> More Info
            </Button>
          </Link>
        </div>

        {/* ── Interactive Action Buttons ── */}
        <HeroActions movie={movie} />

        <p className="text-sm sm:text-base md:text-lg pt-3 md:pt-4 drop-shadow-md max-w-xl line-clamp-3 md:line-clamp-4 text-gray-300 font-medium leading-relaxed">
          {movie.description}
        </p>
      </motion.div>
    </header>
  );
};

export default Hero;

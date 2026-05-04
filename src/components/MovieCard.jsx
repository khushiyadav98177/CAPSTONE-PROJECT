import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] hover:z-20 border border-transparent hover:border-purple-500/50 bg-black"
    >
      <Link to={`/movie/${movie._id}`} className="block relative">
        <motion.img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="w-full aspect-video object-cover transition-opacity duration-300 group-hover:opacity-50" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-sm md:text-base mb-2 drop-shadow-md">{movie.title}</h3>
          
          <div className="flex items-center space-x-2 text-xs mb-2">
            <span className="text-green-400 font-bold drop-shadow-md">{Math.floor(Math.random() * 15 + 85)}% Match</span>
            <span className="text-gray-200 border border-gray-400 px-1 rounded bg-black/50">HD</span>
          </div>

          <div className="flex space-x-2 mt-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            <button className="flex-1 bg-gradient-to-r from-playfix-red to-purple-600 hover:from-playfix-red-hover hover:to-purple-500 text-white py-1.5 rounded-md flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(229,9,20,0.5)]">
              <Play className="w-3 h-3 mr-1 fill-current" /> Play
            </button>
            <button className="p-1.5 border border-gray-400 hover:border-white rounded-md bg-black/50 hover:bg-white/20 transition-colors text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;

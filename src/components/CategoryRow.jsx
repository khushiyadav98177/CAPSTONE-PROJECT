import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const CategoryRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white px-4 md:px-0 drop-shadow-md">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 lg:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)] -ml-4 lg:-ml-6"
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>

        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-0 py-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <div key={movie._id} className="flex-none w-[45vw] sm:w-[35vw] md:w-[28vw] lg:w-[18vw] xl:w-[15vw] snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 lg:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden md:block hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)] -mr-4 lg:-mr-6"
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;

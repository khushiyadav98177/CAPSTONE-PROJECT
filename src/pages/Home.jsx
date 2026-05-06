import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryRow from '../components/CategoryRow';
import { useDebounce } from '../hooks/useDebounce';
import { mockMovies } from '../services/mockData';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [continueWatching, setContinueWatching] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    let filtered = mockMovies;
    if (debouncedSearch) {
      filtered = mockMovies.filter(m => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }
    setMovies(filtered);
  }, [debouncedSearch]);

  useEffect(() => {
    // Simulate getting Continue Watching from localStorage
    const saved = localStorage.getItem('continueWatching');
    if (saved) {
      setContinueWatching(JSON.parse(saved));
    } else {
      // Mock some data for demonstration
      const mockContinue = [mockMovies[0], mockMovies[2]];
      localStorage.setItem('continueWatching', JSON.stringify(mockContinue));
      setContinueWatching(mockContinue);
    }
  }, []);

  return (
    <div className="pb-10">
      {/* Show Hero only if no search is active */}
      {!search && <Hero />}
      
      <div className="px-4 md:px-12 mt-8 space-y-12">
        <div className="flex justify-center md:justify-start">
          <motion.div 
            animate={{ width: isSearchFocused || search ? '100%' : '100%' }}
            initial={{ width: '100%' }}
            className={`md:!w-auto relative flex items-center bg-black/40 border rounded-full overflow-hidden transition-all duration-300 w-full md:min-w-[300px] ${isSearchFocused ? 'border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'border-gray-600/50 hover:border-gray-400'}`}
          >
            <Search className={`absolute left-4 w-5 h-5 transition-colors ${isSearchFocused ? 'text-purple-500' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder="Search titles, genres..." 
              className="w-full py-3 md:py-3 pl-12 pr-4 bg-transparent text-white focus:outline-none placeholder-gray-500 text-base md:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </motion.div>
        </div>

        {search ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-md">Search Results for "{search}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map(movie => (
                <div key={movie._id} className="relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-transparent hover:border-purple-500/50">
                  <img src={movie.thumbnailUrl} alt={movie.title} className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-bold drop-shadow-md text-sm md:text-base text-center px-2">{movie.title}</span>
                  </div>
                </div>
              ))}
            </div>
            {movies.length === 0 && <p className="text-gray-400 text-lg">No matching movies found.</p>}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, staggerChildren: 0.2 }}>
            {continueWatching.length > 0 && (
              <CategoryRow title="Continue Watching" movies={continueWatching} />
            )}
            <CategoryRow title="Trending Now" movies={movies} />
            <CategoryRow title="Action Packed" movies={movies.filter(m => m.genre === 'Action')} />
            <CategoryRow title="Sci-Fi & Fantasy" movies={movies.filter(m => m.genre === 'Sci-Fi')} />
            <CategoryRow title="Gripping Dramas" movies={movies.filter(m => m.genre === 'Drama')} />
          </motion.div>
        )}
      </div>
      {!search && <Footer />}
    </div>
  );
};

export default Home;

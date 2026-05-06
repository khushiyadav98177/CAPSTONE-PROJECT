import React from 'react';
import { mockMovies } from '../services/mockData';
import CategoryRow from '../components/CategoryRow';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Movies = () => {
  const movies = mockMovies.filter(m => m.type === 'Movie');
  
  return (
    <div className="pb-10">
      <Hero />
      <div className="px-4 md:px-12 mt-8 space-y-12">
        <h2 className="text-3xl font-bold text-white mb-8 px-4 md:px-0">Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-0">
          {movies.map(movie => (
            <div key={movie._id} className="transition-transform hover:scale-105">
              <img 
                src={movie.thumbnailUrl} 
                alt={movie.title} 
                className="rounded-lg shadow-xl aspect-video object-cover" 
              />
              <h3 className="text-white mt-2 font-medium">{movie.title}</h3>
            </div>
          ))}
        </div>
        <CategoryRow title="Action Movies" movies={movies.filter(m => m.genre === 'Action')} />
        <CategoryRow title="Sci-Fi Movies" movies={movies.filter(m => m.genre === 'Sci-Fi')} />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;

import React from 'react';
import { mockMovies } from '../services/mockData';
import CategoryRow from '../components/CategoryRow';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const TVShows = () => {
  const shows = mockMovies.filter(m => m.type === 'TV Show');
  
  return (
    <div className="pb-10">
      <Hero />
      <div className="px-4 md:px-12 mt-8 space-y-12">
        <h2 className="text-3xl font-bold text-white mb-8 px-4 md:px-0">TV Shows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-0">
          {shows.map(show => (
            <div key={show._id} className="transition-transform hover:scale-105">
              <img 
                src={show.thumbnailUrl} 
                alt={show.title} 
                className="rounded-lg shadow-xl aspect-video object-cover" 
              />
              <h3 className="text-white mt-2 font-medium">{show.title}</h3>
            </div>
          ))}
        </div>
        <CategoryRow title="Bingeworthy Dramas" movies={shows.filter(m => m.genre === 'Drama')} />
        <CategoryRow title="Sci-Fi & Fantasy" movies={shows.filter(m => m.genre === 'Sci-Fi')} />
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;

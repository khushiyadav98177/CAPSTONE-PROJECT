import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Play, Plus, Check } from 'lucide-react';
import Button from '../components/Button';
import { mockMovies } from '../services/mockData';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const foundMovie = mockMovies.find(m => m._id === id);
    setMovie(foundMovie);
  }, [id]);

  const toggleWatchlist = () => {
    if (!user) return alert('Please login first');
    const inWatchlist = user.watchlist.some(m => m._id === id);
    let newWatchlist;
    if (inWatchlist) {
      newWatchlist = user.watchlist.filter(m => m._id !== id);
    } else {
      newWatchlist = [...user.watchlist, movie];
    }
    const updatedUser = { ...user, watchlist: newWatchlist };
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!movie) return <div className="p-8">Loading...</div>;

  const inWatchlist = user?.watchlist?.some(m => m._id === id);

  return (
    <div>
      {/* Video Player Area */}
      <div className="w-full bg-black aspect-video relative">
        <video 
          controls 
          className="w-full h-full object-contain"
          poster={movie.thumbnailUrl}
        >
          <source src={movie.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Details Area */}
      <div className="px-4 md:px-12 py-8 max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">{movie.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-green-500 font-bold drop-shadow-sm">{Math.floor(Math.random() * 20 + 80)}% Match</span>
          <span className="text-gray-300 font-medium">{new Date(movie.releaseDate).getFullYear()}</span>
          <span className="px-2 py-0.5 border border-gray-500 rounded text-xs font-bold text-gray-300">HD</span>
        </div>
        
        <div className="flex space-x-4 mb-8">
          <Button variant="primary">
            <Play className="w-5 h-5 mr-2 fill-current" /> Play
          </Button>
          <Button variant="secondary" onClick={toggleWatchlist}>
            {inWatchlist ? <Check className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {inWatchlist ? 'My List' : 'My List'}
          </Button>
        </div>

        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
          {movie.description}
        </p>
        
        <div className="mt-8 text-gray-400 text-sm">
          <p><span className="text-gray-500 font-medium">Genres:</span> {movie.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

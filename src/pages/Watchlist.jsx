import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="px-4 md:px-12 py-8">
      <h1 className="text-3xl font-bold mb-8">My List</h1>
      
      {(!user.watchlist || user.watchlist.length === 0) ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">You haven't added any movies to your list yet.</p>
          <Link to="/" className="inline-block mt-4 px-6 py-2 bg-playfix-red text-white rounded font-bold hover:bg-playfix-red-hover transition">
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {user.watchlist.map(movie => (
            <div key={movie._id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

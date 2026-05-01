import React, { useState } from 'react';
import { getImageUrl } from '../services/api';
import './MovieCard.css';

const MovieCard = ({ movie, isLargeRow }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const path = isLargeRow ? movie.poster_path : movie.backdrop_path;
  const imgUrl = path?.startsWith('http') ? path : getImageUrl(path, 'w500');
  
  if (!imgUrl) return null;

  return (
    <div 
      className={`movieCard ${isLargeRow ? 'movieCard--large' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imgUrl}
        alt={movie.name || movie.title}
        className="movieCard__poster"
        loading="lazy"
      />
      
      {isHovered && !isLargeRow && (
        <div className="movieCard__info">
          <div className="movieCard__icons">
            <button className="movieCard__icon movieCard__icon--play">▶</button>
            <button className="movieCard__icon">+</button>
            <button className="movieCard__icon">👍</button>
            <button className="movieCard__icon movieCard__icon--more">⌄</button>
          </div>
          <div className="movieCard__meta">
            <span className="movieCard__match">
              {Math.floor(Math.random() * 20 + 80)}% Match
            </span>
            <span className="movieCard__rating">
              {movie.adult ? '18+' : '13+'}
            </span>
            <span>{movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : (movie.release_date ? new Date(movie.release_date).getFullYear() : '')}</span>
          </div>
          <p className="movieCard__title">{movie.name || movie.title}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

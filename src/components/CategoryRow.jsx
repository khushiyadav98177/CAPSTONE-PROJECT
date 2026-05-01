import React, { useState, useEffect, useRef } from 'react';
import axios from '../services/api';
import { getMockMovies } from '../services/mockData';
import './CategoryRow.css';
import MovieCard from './MovieCard';

const CategoryRow = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("API Error, falling back to mock data for row");
        setMovies(getMockMovies());
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        <button className="row__arrow row__arrow--left" onClick={() => handleScroll('left')}>
          ‹
        </button>
        
        <div className="row__posters" ref={rowRef}>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  isLargeRow={isLargeRow} 
                />
              )
          )}
        </div>
        
        <button className="row__arrow row__arrow--right" onClick={() => handleScroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;

import React, { useState, useEffect } from 'react';
import axios, { requests, getImageUrl } from '../services/api';
import { getMockHero } from '../services/mockData';
import './Hero.css';

const Hero = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data.results;
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("API Error, falling back to stunning mock data");
        setMovie(getMockHero());
      }
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!movie) {
    return <header className="hero__skeleton"></header>;
  }

  // If it's a mock movie, the path might be a full URL already
  const backdropUrl = movie.backdrop_path?.startsWith('http') 
    ? movie.backdrop_path 
    : getImageUrl(movie.backdrop_path);

  return (
    <header className="hero" style={{
      backgroundImage: `url("${backdropUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}>
      <div className="hero__contents">
        <h1 className="hero__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="hero__buttons">
          <button className="hero__button hero__button--play">
            <span className="hero__icon">▶</span> Play
          </button>
          <button className="hero__button hero__button--list">
            <span className="hero__icon">ℹ️</span> More Info
          </button>
        </div>
        <h1 className="hero__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="hero__fadeBottom"></div>
    </header>
  );
};

export default Hero;

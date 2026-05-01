import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import CategoryRow from '../components/CategoryRow';
import { requests } from '../services/api';

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <Hero />
      <div style={{ marginTop: '-80px', paddingBottom: '20px' }}>
        <CategoryRow 
          title="NETFLIX ORIGINALS" 
          fetchUrl={requests.fetchNetflixOriginals} 
          isLargeRow={true} 
        />
        <CategoryRow 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending} 
        />
        <CategoryRow 
          title="Top Rated" 
          fetchUrl={requests.fetchTopRated} 
        />
        <CategoryRow 
          title="Action Movies" 
          fetchUrl={requests.fetchActionMovies} 
        />
        <CategoryRow 
          title="Comedy Movies" 
          fetchUrl={requests.fetchComedyMovies} 
        />
        <CategoryRow 
          title="Horror Movies" 
          fetchUrl={requests.fetchHorrorMovies} 
        />
        <CategoryRow 
          title="Romance Movies" 
          fetchUrl={requests.fetchRomanceMovies} 
        />
        <CategoryRow 
          title="Documentaries" 
          fetchUrl={requests.fetchDocumentaries} 
        />
      </div>
    </div>
  );
};

export default Home;

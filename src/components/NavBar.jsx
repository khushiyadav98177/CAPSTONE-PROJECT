import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar__scrolled' : ''}`}>
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">NETFLIX</Link>
        <div className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/">TV Shows</Link>
          <Link to="/">Movies</Link>
          <Link to="/">New & Popular</Link>
          <Link to="/">My List</Link>
        </div>
      </div>
      
      <div className="navbar__right">
        <div className={`navbar__search ${searchOpen ? 'navbar__search--active' : ''}`}>
          <button onClick={() => setSearchOpen(!searchOpen)}>🔍</button>
          {searchOpen && <input type="text" placeholder="Titles, people, genres" autoFocus />}
        </div>
        <span className="navbar__kids">Kids</span>
        <button className="navbar__bell">🔔</button>
        <div className="navbar__profile">
          <div className="navbar__avatar">😎</div>
          <span className="navbar__caret">▼</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

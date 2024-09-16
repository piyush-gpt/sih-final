import React from 'react';
import logo from './pics/logo.png';

import './MuseumComponent.css'
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Museum Sathi Logo" />
          <div className="name">
            <h1>MUSEUM SATHI</h1>
            <p>Book museum tickets hassle-free!</p>
          </div>
        </div>
        <nav>
          <a href="#">HOME</a>
          <a href="#">VISIT</a>
          <a href="#">EXHIBITIONS</a>
          <a href="#">PROGRAMS & EVENTS</a>
          <a href="#">STORE</a>
        </nav>
        <button className="btn">LOGIN</button>
      </div>
    </header>
  );
};

export default Header;
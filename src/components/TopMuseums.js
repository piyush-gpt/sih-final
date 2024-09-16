import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import rfMuseum from './pics/rfmuseum.jpeg';
import igMuseum from './pics/igmuseum.jpg';
import nrMuseum from './pics/nrmuseum.jpg';
import jmMuseum from './pics/jmmuseum.jpg';

import "./MuseumComponent.css"
const TopMuseums = () => {
  const [filters, setFilters] = useState({
    sort: '',
    theme: [],
    rating: ''
  });

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: checked
          ? [...prevFilters[name], value]
          : prevFilters[name].filter(item => item !== value)
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Filters applied:', filters);
    // Here you would typically filter the museums based on the selected filters
  };

  const handleReset = () => {
    setFilters({
      sort: '',
      theme: [],
      rating: ''
    });
  };

  useEffect(() => {
    const map = L.map('leaflet-map').setView([28.6139, 77.2090], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map)
      .bindPopup('Delhi')
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="top-museums">
      <h2>Top Museums Near You!</h2>
      <div className="museum-container">
        <div className="filters">
          <h2>SELECT FILTERS</h2>
          <form onSubmit={handleSubmit}>
            <div className="filter-item">
              <h4>Sort By</h4>
              <div className="filter-item-options">
                <input 
                  type="radio" 
                  id="relevance" 
                  name="sort" 
                  value="relevance"
                  checked={filters.sort === 'relevance'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="relevance">Relevance</label>

                <input 
                  type="radio" 
                  id="popularity" 
                  name="sort" 
                  value="popularity"
                  checked={filters.sort === 'popularity'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="popularity">Popularity</label>

                <input 
                  type="radio" 
                  id="trip-rank" 
                  name="sort" 
                  value="trip-rank"
                  checked={filters.sort === 'trip-rank'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="trip-rank">Trip Rank</label>
              </div>
            </div>
            
            <div className="filter-item">
              <h4>Theme</h4>
              <div className="filter-item-options">
                <input 
                  type="checkbox" 
                  id="history" 
                  name="theme" 
                  value="history"
                  checked={filters.theme.includes('history')}
                  onChange={handleFilterChange}
                />
                <label htmlFor="history">History</label>

                <input 
                  type="checkbox" 
                  id="art" 
                  name="theme" 
                  value="art"
                  checked={filters.theme.includes('art')}
                  onChange={handleFilterChange}
                />
                <label htmlFor="art">Art</label>

                <input 
                  type="checkbox" 
                  id="science" 
                  name="theme" 
                  value="science"
                  checked={filters.theme.includes('science')}
                  onChange={handleFilterChange}
                />
                <label htmlFor="science">Science</label>

                <input 
                  type="checkbox" 
                  id="war" 
                  name="theme" 
                  value="war"
                  checked={filters.theme.includes('war')}
                  onChange={handleFilterChange}
                />
                <label htmlFor="war">War</label>
              </div>
            </div>
            
            <div className="filter-item">
              <h4>Rating</h4>
              <div className="filter-item-options">
                <input 
                  type="radio" 
                  id="rating4.5" 
                  name="rating" 
                  value="4.5"
                  checked={filters.rating === '4.5'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="rating4.5">4.5+</label>

                <input 
                  type="radio" 
                  id="rating4.0" 
                  name="rating" 
                  value="4.0"
                  checked={filters.rating === '4.0'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="rating4.0">4.0+</label>

                <input 
                  type="radio" 
                  id="rating3.0" 
                  name="rating" 
                  value="3.0"
                  checked={filters.rating === '3.0'}
                  onChange={handleFilterChange}
                />
                <label htmlFor="rating3.0">3.0+</label>
              </div>
            </div>
            
            <button type="submit">Apply Filters</button>
            <button type="button" onClick={handleReset}>Reset Filters</button>
          </form>
          <div id="leaflet-map" className="map-container"></div>
        </div>
        
        <div className="museum-listings">
          <MuseumCard
            image={rfMuseum}
            name="Red Fort Museum Of Arms & Weapons"
            rating="4.4"
            numRatings="18,620"
            popularity="Popular"
            location="Red Fort Campus, Old Delhi,Delhi,"
          />
          <MuseumCard
            image={igMuseum}
            name="Indira Gandhi Memorial Museum"
            rating="4.4"
            numRatings="14,043"
            popularity="Trending"
            location="Safdarjung Lane Area, Delhi Gymkhana Club, New Delhi"
          />
          <MuseumCard
            image={nrMuseum}
            name="National Rail Museum"
            rating="4.4"
            numRatings="14,043"
            popularity="Trending"
            location="Service Rd, Chanakyapuri, New Delhi, Delhi"
          />
          <MuseumCard
            image={jmMuseum}
            name="Jantar Mantar"
            rating="4.5"
            numRatings="83,777"
            popularity="Trending"
            location="Connaught Place Sansad Marg Parliament Street, New Delhi"
          />
        </div>
      </div>
    </section>
  );
};

const MuseumCard = ({ image, name, rating, numRatings, popularity, location }) => (
  <div className="museum-card">
    <div className="museum-card-content">
      <div className="museum-image">
        <img src={image} alt={name} />
      </div>
      <div className="museum-description">
        <h3>{name}</h3>
        <p><strong>{rating}</strong> ⭐⭐⭐⭐⭐ | {numRatings} ratings | {popularity}</p>
        <p><i className="fas fa-map-marker-alt"></i> {location}</p>
        <button className="show-number"><i className="fas fa-phone-alt"></i> Show Number</button>
        <button className="send-enquiry"><i className="fas fa-envelope"></i> Book Now</button>
      </div>
    </div>
  </div>
);

export default TopMuseums;
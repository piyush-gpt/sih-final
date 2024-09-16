import React from 'react';
import './MuseumComponent.css'

const Filters = () => (
  <div className="filters">
    <h2>SELECT FILTERS</h2>
    <form>
      <div className="filter-item">
        <h4>Sort By</h4>
        <div className="filter-item-options">
          <input type="radio" id="relevance" name="sort" />
          <label htmlFor="relevance">Relevance</label>

          <input type="radio" id="popularity" name="sort" />
          <label htmlFor="popularity">Popularity</label>

          <input type="radio" id="trip-rank" name="sort" />
          <label htmlFor="trip-rank">Trip Rank</label>
        </div>
      </div>
      <div className="filter-item">
        <h4>Theme</h4>
        <div className="filter-item-options">
          <input type="checkbox" id="history" />
          <label htmlFor="history">History</label>

          <input type="checkbox" id="art" />
          <label htmlFor="art">Art</label>

          <input type="checkbox" id="science" />
          <label htmlFor="science">Science</label>

          <input type="checkbox" id="war" />
          <label htmlFor="war">War</label>
        </div>
      </div>
      <div className="filter-item">
        <h4>Rating</h4>
        <div className="filter-item-options">
          <input type="radio" id="rating4.5" name="rating" />
          <label htmlFor="rating4.5">4.5+</label>

          <input type="radio" id="rating4.0" name="rating" />
          <label htmlFor="rating4.0">4.0+</label>

          <input type="radio" id="rating3.0" name="rating" />
          <label htmlFor="rating3.0">3.0+</label>
        </div>
      </div>
      <button type="submit">Apply Filters</button>
      <button type="reset">Reset Filters</button>
    </form>
  </div>
);

export default Filters;

import React from 'react';
import museum1 from './pics/rfmuseum.jpeg';
import museum2 from './pics/igmuseum.jpg';
import museum3 from './pics/nrmuseum.jpg';
import museum4 from './pics/jmmuseum.jpg';

import './MuseumComponent.css'
const MuseumScroll = () => (
  <div className="museum-listings">
    <div className="museum-card">
      <div className="museum-image">
        <img src={museum1} alt="Red Fort Museum" />
      </div>
      <div className="museum-description">
        <h3>Red Fort Museum Of Arms & Weapons</h3>
        <p><strong>4.4</strong> ⭐⭐⭐⭐⭐ | 18,620 ratings | Popular</p>
        <p><i className="fas fa-map-marker-alt"></i>  Red Fort Campus, Old Delhi, Delhi</p>
        <button className="show-number"><i className="fas fa-phone-alt"></i> Show Number</button>
        <button className="send-enquiry"><i className="fas fa-envelope"></i> Book Now</button>
      </div>
    </div>

    {/* Repeat for other museums */}
  </div>
);

export default MuseumScroll;

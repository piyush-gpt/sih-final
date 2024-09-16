import { useEffect, useRef } from 'react';
import L from 'leaflet'; // Assuming you're using Leaflet

import "./MuseumComponent.css"
const Maps = () => {
  const mapRef = useRef(null); // Create a ref to store the map instance
  const containerRef = useRef(null); // Create a ref for the map container

  useEffect(() => {
    // Only initialize the map if it's not already initialized
    if (mapRef.current === null) {
      mapRef.current = L.map(containerRef.current).setView([51.505, -0.09], 13); // Initialize map here
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Optional: Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Remove map instance on unmount
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" ref={containerRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default Maps;

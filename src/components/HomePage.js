import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ChatBot from './ChatBot';
import TopMuseums from './TopMuseums';
import SpecialEvents from './SpecialEvents';
import NewsUpdates from './NewsUpdates';
import Footer from './Footer';
import './MuseumComponent.css'
const HomePage = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ChatBot />
      <TopMuseums />
      <SpecialEvents />
      <NewsUpdates />
      <Footer />
    </div>
  );
};

export default HomePage;
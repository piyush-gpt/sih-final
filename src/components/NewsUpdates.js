import React from 'react';
import news1 from './pics/news1.jpg';
import logoNews from './pics/logonews.jpg';

import './MuseumComponent.css'
const NewsUpdates = () => {
  return (
    <section className="news-updates">
      <div className="news">
        <h2>Latest News</h2>
        <article className="news-item">
          <img src={news1} alt="News Image 1" />
          <div className="news-content">
            <h3>India To Get World's Largest Museum In 2025: Union Minister</h3>
            <p>An agreement has been signed between France and India for this purpose, the tourism and culture minister said, adding that he was fortunate and proud to be part of the opportunity to execute the world's largest museum project.</p>
            <a href="#" className="read-more">Read more</a>
          </div>
        </article>
      </div>
      <div className="updates">
        <h2>Recent Updates</h2>
        <UpdateItem
          title="New Exhibit Opening: Ancient Artifacts"
          content="Explore the newly curated collection of ancient artifacts showcasing the rich history of early civilizations. The exhibit opens next week with a special preview event."
          newspaper="Museum Daily"
        />
        <UpdateItem
          title="Interactive Museum Tours Available"
          content="Experience our museum like never before with our new interactive tours. Use augmented reality to get an in-depth look at our exhibits and artifacts."
          newspaper="Culture Times"
        />
        <UpdateItem
          title="Community Outreach Program Launched"
          content="We're excited to launch our new community outreach program aimed at bringing educational programs and events to local schools and organizations."
          newspaper="Art Review"
        />
      </div>
    </section>
  );
};

const UpdateItem = ({ title, content, newspaper }) => (
  <div className="update-item">
    <div className="update-header">
      <img src={logoNews} alt={`${newspaper} Logo`} className="update-logo" />
      <span className="newspaper-name">{newspaper}</span>
    </div>
    <div className="update-content">
      <h3>{title}</h3>
      <p>{content}</p>
      <a href="#" className="learn-more">Learn More</a>
    </div>
  </div>
);

export default NewsUpdates;
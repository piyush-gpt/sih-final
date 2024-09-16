import React, { useRef, useEffect } from 'react';
import event1 from './pics/event1.png';
import event2 from './pics/event2.png';
import event3 from './pics/event3.png';
import event4 from './pics/event4.png';

import './MuseumComponent.css'
const SpecialEvents = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (carousel.scrollWidth !== carousel.clientWidth) {
        carousel.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
        scrollAmount += 300;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
          scrollAmount = 0;
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    };

    const intervalId = setInterval(autoScroll, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="special-events-section">
      <h2>SPECIAL EVENTS</h2>
      <div className="events-carousel" ref={carouselRef}>
        <EventCard
          image={event1}
          title="OPEN HOUSE QUIZ"
          description="VIT Museum organizes an open house quiz on the life and works of Sir M Visvesvaraya."
        />
        <EventCard
          image={event2}
          title="NATIONAL SCIENCE SEMINAR"
          description="Nehru Science Center is organizing a science seminar on AI : Potential & Concerns."
        />
        <EventCard
          image={event3}
          title="POTTERY MAKING WORKSHOP"
          description="National Gallery of Modern Art is organizing a pottery workshop for all ages."
        />
        <EventCard
          image={event4}
          title="CULTURAL PERFORMANCE ON VASANT UTSAV"
          description="Indian Museum, Kolkata in collaboration with Prabha Khaitan Foundation organized a cultural event to celebrate the colours of Vasanta."
        />
      </div>
    </section>
  );
};

const EventCard = ({ image, title, description }) => (
  <div className="event-card">
    <img src={image} alt={title} />
    <div className="event-description">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default SpecialEvents;
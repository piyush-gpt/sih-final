import './MuseumCard.css'

import React, { useState } from 'react';

const MuseumCard = ({ museum }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % museum.images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + museum.images.length) % museum.images.length);
    };

    return (
        <div className="museum-card-2">
            <div className="photo-carousel">
                <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {museum.images.map((image, index) => (
                        <img key={index} src={image} alt={`Museum Photo ${index + 1}`} />
                    ))}
                </div>x
            </div>
            <div className="museum-details">
                <h2>{museum.name}</h2>
                <div className="rating">
                    <span>{museum.rating}</span> <span>({museum.totalRatings} ratings)</span>
                </div>
                <span className="label">Trending</span>
                <p>Location: {museum.location}</p>
                <p>Category: {museum.category}</p>
                <span>
                    <button className="show-number-2">Show Number</button>
                    <button className="send-enquiry-2">Send Enquiry</button>
                </span>
            </div>
        </div>
    );
};

export default MuseumCard;

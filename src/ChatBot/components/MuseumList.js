import React from 'react';
import MuseumCard from './MuseumCard';
import './MuseumCard.css'
import image1 from '../images/1.jpeg';
import image1_1 from '../images/1_1.jpeg';
import image1_2 from '../images/1_2.jpeg';
import image1_3 from '../images/1_3.jpeg';
import image2 from '../images/2.jpeg';
import image2_1 from '../images/2_1.jpeg';
import image2_2 from '../images/2_2.jpeg';
import image2_3 from '../images/2_3.jpg';
import gandhi from '../images/image (2).png';

const MuseumList = () => {
    const museums = [
        {
            name: 'Victoria memorial',
            images: [
                `${image1}`,
                `${image1_1}`,
                `${image1_2}`,
                `${image1_3}`
            ],
            rating: '★★★★☆',
            totalRatings: 169,
            location: 'Kolkata',
            category: 'Museum'
        },
        {
            name: 'Gandhi Memorial',
            images: [
                `${gandhi}`,
            ],
            rating: '★★★☆☆',
            totalRatings: 79,
            location: 'New Delhi',
            category: 'Museum'
        },
    ];

    return (
        <div className="container">
            <div className="card-container-2">
                {museums.map((museum, index) => (
                    <MuseumCard key={index} museum={museum} />
                ))}
            </div>
        </div>
    );
};

export default MuseumList;

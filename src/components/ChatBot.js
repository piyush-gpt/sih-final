import React from 'react';
import botIcon from './pics/Bot Icon.gif';
import enterIcon from './pics/newarrow.png';

import { useNavigate } from 'react-router-dom';
import './MuseumComponent.css'
const ChatBot = () => {

  const Navigate=useNavigate();
  function redirectToChatBot(){
    Navigate("./chatbot")
  }
  return (
    <div className="container3">
      <div className="text-box-container">
        <img src={botIcon} alt="Bot Icon" className="bot-icon" />
        <input type="text" className="text-input" placeholder="Ask Museum Sathi..."  />
        <button className="enter-button" onClick={redirectToChatBot}>
          <img src={enterIcon} alt="Enter Btn" className="enter-icon" />
        </button>
      </div>
      <div className="booklearnmore">
        <button className="btn2">Book Tickets</button>
        <button className="learnmore">Learn More</button>
      </div>
    </div>
  );
};

export default ChatBot;
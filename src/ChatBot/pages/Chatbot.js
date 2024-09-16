import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { FaArrowUp, FaMicrophone } from 'react-icons/fa';
import MuseumList from '../components/MuseumList';
 import { buyTickets } from '../operations/paymentAPI';
 import imagelogo from '../images/logo.png';
// Check if the Web Speech API is supported
const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

const Chatbot = () => {
  // State to track the conversation
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [bookingInfo, setBookingInfo] = useState({});
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [isAudioMode, setIsAudioMode] = useState(false); // Audio mode state
  const [recognition, setRecognition] = useState(null);

  const apiUrl = process.env.REACT_APP_CHATBOT_API;

  const chatBoxRef = useRef(null);

  // Function to scroll to the bottom of the chat box
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  // Scroll to bottom whenever messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isSpeechRecognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'en-US';
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;
      recognitionInstance.onresult = handleResult;
      recognitionInstance.onerror = handleError;
      setRecognition(recognitionInstance);
    } else {
      console.error('Speech Recognition API is not supported in this browser.');
    }
  }, []);

  // Handle result from speech recognition
  const handleResult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserInput(transcript);
    sendMessage();
  };

  // Handle errors
  const handleError = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  // Sending Initial 'Hi' to bot
  useEffect(() => {
    if (!hasSentInitialMessage) {
      const sendInitialMessage = async () => {
        try {
          const initialMessage = { text: "Hi", sender: 'user' };
          setMessages([initialMessage]);

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: "Hi", allMessages: messages })
          });

          const data = await response.json();
          const botMessage = { text: data.message, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.error('Error sending initial message:', error);
          const errorMessage = { text: "Sorry, something went wrong.", sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      };

      sendInitialMessage();
      setHasSentInitialMessage(true);
    }
  }, []);

  useEffect(() => {
    console.log("Updated Booking Info:", bookingInfo);
  }, [bookingInfo]);

  const parseMessage = (text) => {
    // Split text into lines, filtering out empty lines
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return <div>{
    lines.map((line, lineIndex) =>(
      <React.Fragment key={lineIndex}>
        {parseLine(line)}
        {lineIndex !== lines.length - 1 && <><br /><br /></>}
      </React.Fragment>
    ))
  }
  
    </div>
  };

  const parseLine = (line) => {
    const parts = line.split(/(\*\*.+?\*\*)/); // Split by **bold** segments
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>; // Render bold text
      }
      return <span key={i}>{part}</span>; // Render normal text
    });
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (userInput.trim() === '') return;
    console.log("type", typeof (userInput));
    console.log(userInput);
    const newMessage = { text: userInput, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    console.log("object", messages);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput, allMessages: messages })
      });

      const data = await response.json();
      const botMessage = { text: data.message, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      //setUserInput('');
      console.log("object2", botMessage);
      if (isAudioMode) {
        window.responsiveVoice.speak(data.message, "Hindi Female", { rate: 1.0 });
      }

      // Check if the last line of the bot's message contains "BOOKING PROCEDURE COMPLETE"
      const lines = data.message.split('\n').filter(line => line.trim() !== '');
      const lastLine = lines[lines.length - 1].trim();

      

      if (lastLine.includes("BOOKING PROCEDURE COMPLETE")) {
        buyTickets(messages)
        // Send "RETURN BOOKING INFORMATION" to the bot
        // const bookingResponse = await fetch(apiUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ text: "RETURN BOOKING INFORMATION", allMessages: messages })
        // });

        // const bookingData = await bookingResponse.json();
        // const bookingInfoMessage = bookingData.message;

        // // Store the booking information in an object
        // setBookingInfo({ details: bookingInfoMessage });

        // Optionally, you can add the booking information to the chat UI
        // const bookingInfoDisplay = { text: bookingInfoMessage, sender: 'bot' };
        // setMessages((prevMessages) => [...prevMessages, bookingInfoDisplay]);
      }
      
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage = { text: "Sorry, something went wrong.", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const toggleMode = () => {
    setIsAudioMode(!isAudioMode);
    if (!isAudioMode && recognition) {
      recognition.stop(); // Stop listening if toggled off
    }
  };

  const handleMicButtonMouseDown = () => {
    if (isAudioMode && recognition) {
      recognition.start(); // Start listening when button is pressed
    }
  };

  const handleMicButtonMouseUp = () => {
    if (isAudioMode && recognition) {
      recognition.stop(); // Stop listening when button is released
    }
  };

  return (
    <div className="chatbot-ui">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="logo">
        <img src={imagelogo} alt="Logo" />
        <div>MUSEUM SATHI</div></div>
        <div className="nav-links">
          <div className="help">Help</div>
          <div className="settings">Settings</div>
          <div className="mode-toggle">
            <label className="switch">
              <input type="checkbox" checked={isAudioMode} onChange={toggleMode} />
              <span className="slider round"></span>
            </label>
            <div className="mode-label">
              {isAudioMode ? "Audio Mode" : "Text Mode"}
            </div>
          </div>
          <div className="profile"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='outer-div'>


          {/* Right Section */}
          <div className="right-section">
            <div className="box">
              <MuseumList />
            </div>
          </div>
          {/* Left Section */}
          <div className="left-section">
            <div className="chat-box" ref={chatBoxRef}>
              {messages.filter((_, index) => index !== 0).map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === 'bot' ? 'chat-response' : ''
                  }`}
                >
                  {parseMessage(message.text)}
                </div>
              ))}
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" &&  sendMessage()}
              />
              <button className=' chatbotbtn'
                onMouseDown={handleMicButtonMouseDown}
                onMouseUp={handleMicButtonMouseUp}
              >
                <FaMicrophone size={20} />
              </button>
              <button className=' chatbotbtn' onClick={sendMessage}>
                <FaArrowUp size={20} />
              </button>
            </div>
          </div>

          
      </div>
    </div>
  );
};

export default Chatbot;

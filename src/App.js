import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './ChatBot/index';
import HomePage from './components/HomePage';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    <Route path='/chatbot' element={<Index/>}/>
    </Routes>
  );
};

export default App;
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ChatAI from './components/ChatAI';



function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatAI />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


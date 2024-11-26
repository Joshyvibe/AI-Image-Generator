import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ImageGenerator from './components/ImageGenerator';


function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageGenerator />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

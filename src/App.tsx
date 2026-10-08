import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Floor1 from './pages/Floor1';
import Floor2 from './pages/Floor2';
import Floor3 from './pages/Floor3';
import Admin from './pages/Admin';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Projector Displays */}
        <Route path="/floor1" element={<Floor1 />} />
        <Route path="/floor2" element={<Floor2 />} />
        <Route path="/floor3" element={<Floor3 />} />

        {/* Secret / Obscure Admin Controller */}
        <Route path="/admin98427" element={<Admin />} />

        {/* Default route redirects to Floor 1 projector */}
        <Route path="/" element={<Navigate to="/floor1" replace />} />
        <Route path="*" element={<Navigate to="/floor1" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

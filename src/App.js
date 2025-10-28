import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import DealsPage from './pages/DealsPage';
import DealDetailPage from './pages/DealDetailPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/deal/:id" element={<DealDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

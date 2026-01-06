
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SelectionFlow from './pages/SelectionFlow';
import AdminDashboard from './pages/AdminDashboard';
import Status from './pages/Status';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<SelectionFlow />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/status" element={<Status />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

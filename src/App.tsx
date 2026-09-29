import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NearbyWells from './pages/NearbyWells';
import WellDetails from './pages/WellDetails';
import SimilarWells from './pages/SimilarWells';
import AIAssistant from './pages/AIAssistant';
import RiskAnalysis from './pages/RiskAnalysis';
import DecisionSupport from './pages/DecisionSupport';
import Reports from './pages/Reports';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('eRTMAC_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('eRTMAC_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('eRTMAC_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout onLogout={handleLogout} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nearby-wells" element={<NearbyWells />} />
          <Route path="/well/:wellId" element={<WellDetails />} />
          <Route path="/similar-wells" element={<SimilarWells />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/decision-support" element={<DecisionSupport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

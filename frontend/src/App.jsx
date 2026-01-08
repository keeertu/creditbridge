import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ModeSelection from "./pages/ModeSelection";
import BulkAnalysis from "./pages/BulkAnalysis";
import SingleProfileInput from "./pages/SingleProfileInput";
import Landing from "./pages/Landing";
import AccountConnection from "./pages/AccountConnection";
import PrivacyDashboard from "./pages/PrivacyDashboard";
import ImpactMetrics from "./pages/ImpactMetrics";
import LenderPortfolio from "./pages/LenderPortfolio";
import { RoleProvider } from "./context/RoleContext";
import Onboarding from "./components/Onboarding";

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  return (
    <RoleProvider>
      <BrowserRouter>
        {/* Onboarding Modal - shows on first visit */}
        <Onboarding onComplete={() => setOnboardingComplete(true)} />

        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/mode-selection" element={<ModeSelection />} />
          <Route path="/single-input" element={<SingleProfileInput />} />
          <Route path="/bulk" element={<BulkAnalysis />} />
          <Route path="/report" element={<Dashboard />} />

          {/* New Feature Routes */}
          <Route path="/connect-account" element={<AccountConnection />} />
          <Route path="/privacy" element={<PrivacyDashboard />} />
          <Route path="/impact" element={<ImpactMetrics />} />
          <Route path="/lender-portfolio" element={<LenderPortfolio />} />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;

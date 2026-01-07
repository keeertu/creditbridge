import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ModeSelection from "./pages/ModeSelection";
import BulkAnalysis from "./pages/BulkAnalysis";
import SingleProfileInput from "./pages/SingleProfileInput";
import Landing from "./pages/Landing";
import { RoleProvider } from "./context/RoleContext";

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mode-selection" element={<ModeSelection />} />
          <Route path="/single-input" element={<SingleProfileInput />} />
          <Route path="/bulk" element={<BulkAnalysis />} />
          <Route path="/report" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;

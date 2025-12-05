import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { EventTypeProvider } from "./context/EventTypeContext";
import UserBehaviorTracker from "./components/analytics/UserBehaviorTracker";
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/HomePage";
import AvailabilityPage from "./pages/AvailabilityPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <EventTypeProvider>
      <Router>
        <UserBehaviorTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beschikbaarheid" element={<AvailabilityPage />} />
            <Route path="/prijzen" element={<PricingPage />} />
            <Route path="/over-ons" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </EventTypeProvider>
  );
}

export default App;

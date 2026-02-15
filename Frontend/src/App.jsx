import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import About from "./pages/about";
import Benefits from "./pages/benefits";
import CallToAction from "./pages/Call-to-action";
import FAQPage from "./pages/FAQ-page";
import HeroSectionItDay from "./components/Hero-section-itday";
import NotFound from "./pages/not-found";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/Register-page";
import HeroSection from "./components/jutsa-components/HeroSection";
import ServiceSection from "./components/jutsa-components/Services";
import TeamSection from "./components/jutsa-components/team-section";
import ItDay from "./pages/It-day";
import Sports from "./pages/Sports";
import Contact from "./pages/Contact";
import AboutSection from "./components/jutsa-components/About";
import EventsSection from "./components/jutsa-components/events";
import CtaSection from "./components/jutsa-components/cta";
import Announcement from "./components/jutsa-components/Announcement";
import CandidateForm from "./components/jutsa-components/CandidateForm";
import CandidateRegPage from "./pages/candidate-reg";

// Layout with header and footer

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <HelmetProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <AboutSection />
                  <ServiceSection />
                  <TeamSection />
                  <EventsSection />
                  <CtaSection />
                </>
              }
            />
            <Route path="/about" element={<About />} />{" "}
            <Route path="/it-day" element={<ItDay />} />{" "}
            <Route path="/sports" element={<Sports />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/candidate-reg" element={<CandidateRegPage />} />
            <Route path="/about/faq" element={<FAQPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </HelmetProvider>
    </>
  );
}

export default App;

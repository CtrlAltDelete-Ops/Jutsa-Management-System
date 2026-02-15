import React from "react";
import HeroSection from "../components/Hero-section-itday";
import CallToAction from "./Call-to-action";
import Benefits from "./benefits";
import AboutItDaySection from "../components/about-itday-section";
import Departments from "../components/Departments";

const ItDay = () => {
  return (
    <div>
      <HeroSection />
      <Benefits />
      <AboutItDaySection />
      <CallToAction />
      <Departments />
    </div>
  );
};

export default ItDay;

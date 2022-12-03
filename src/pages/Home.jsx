import React from "react";

import HeroSection from "../components/ui/HeroSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <StepSection />
      <Trending />
    </>
  );
};

export default Home;

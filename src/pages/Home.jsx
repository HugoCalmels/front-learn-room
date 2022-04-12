import React from "react";

import { Hero } from "sections/Hero";
import Features from "sections/Features";
import Testominy from "sections/Testominy";
import WeGot from "sections/WeGot";
import StorySection from "sections/StorySection";
import TopPageButtonComponent from "components/TopPageButtonComponent";

export const Home = () => {
  return (
    <div>
      <TopPageButtonComponent />
      <Hero />
      <Features />
      <WeGot />
      <Testominy bgColor="bgGreenLight" />
      <StorySection />
    </div>
  );
};

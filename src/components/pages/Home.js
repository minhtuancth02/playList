import React from 'react';
import "../../App.css";
import { HeroSection } from '../HeroSection';
import Cards from "../Cards";
// const Cards = React.lazy(() => import("../Cards"));

function Home() {

  return (
    <>
      <HeroSection />
      <Cards />
    </>
  );
    
}

export default Home;
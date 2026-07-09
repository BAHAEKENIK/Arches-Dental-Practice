import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/sections/Hero';
import About from '../../components/sections/About';
import Services from '../../components/sections/Services';
import Team from '../../components/sections/Team';
import Testimonials from '../../components/sections/Testimonials';
import Contact from '../../components/sections/Contact';
import Footer from '../../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
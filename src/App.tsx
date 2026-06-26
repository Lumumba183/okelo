import { useState } from 'react';
import Navigation from './components/Navigation';
import SlideInMenu from './components/SlideInMenu';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import GeodesicSection from './sections/GeodesicSection';
import ImpactSection from './sections/ImpactSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#F4F3EE' }}>
      <Navigation onMenuOpen={() => setMenuOpen(true)} />
      <SlideInMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GeodesicSection />
        <ImpactSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

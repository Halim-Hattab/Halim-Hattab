import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();
  
  // Update page title
  useEffect(() => {
    document.title = "Halim Hattab | Portfolio";
  }, []);

  return (
    <div className={`${theme} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
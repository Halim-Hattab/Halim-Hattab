import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';
import ProjectDetailPage from './components/ProjectDetailPage';

function App() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const handleHeroVisibilityChange = (visible: boolean) => {
    setIsHeroVisible(visible);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isHeroVisible={isHeroVisible} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection onVisibilityChange={handleHeroVisibilityChange} />
                <ExperienceSection />
                <PortfolioSection />
                <EducationSection />
                <SkillsSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import { skillCategories, languages } from '../data/portfolioData';
import SkillCategoryCard from '../components/SkillCategoryCard';
import LanguageCard from '../components/LanguageCard';
import AnimatedSection from '../components/AnimatedSection';

const SkillsSection: React.FC = () => {
  return (
    <AnimatedSection id="skills" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Skills & Languages
        </h2>
        
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Skills
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Languages
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <LanguageCard key={index} language={language} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
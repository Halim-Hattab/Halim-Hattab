import React from 'react';
import { experiences } from '../data/portfolioData';
import ExperienceCard from '../components/ExperienceCard';
import AnimatedSection from '../components/AnimatedSection';

const ExperienceSection: React.FC = () => {
  return (
    <AnimatedSection id="experience" className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Professional Experience
        </h2>
        
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              experience={experience} 
              isEven={index % 2 === 1}
            />
          ))}
          
          {/* Timeline line for desktop view */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;
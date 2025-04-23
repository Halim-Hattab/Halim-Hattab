import React from 'react';
import { education, certifications } from '../data/portfolioData';
import EducationCard from '../components/EducationCard';
import CertificationCard from '../components/CertificationCard';
import AnimatedSection from '../components/AnimatedSection';

const EducationSection: React.FC = () => {
  return (
    <AnimatedSection id="education" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Education & Certifications
        </h2>
        
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Academic Background
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Professional Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default EducationSection;
import React from 'react';
import { portfolioItems } from '../data/portfolioData';
import PortfolioCard from '../components/PortfolioCard';
import AnimatedSection from '../components/AnimatedSection';

const PortfolioSection: React.FC = () => {
  return (
    <AnimatedSection id="portfolio" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Featured Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} item={item} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PortfolioSection;
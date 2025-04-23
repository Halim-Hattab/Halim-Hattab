import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, Linkedin, ChevronDown } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatedSection id="hero" className="min-h-screen px-4 sm:px-6 flex flex-col justify-center relative">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="block">Hi, I'm</span>
          <span className="block text-teal-600 dark:text-teal-400">
            {personalInfo.name}
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8">
          {personalInfo.title}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </a>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Phone className="w-5 h-5 mr-2" />
            <span>{personalInfo.phone}</span>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Linkedin className="w-5 h-5 mr-2" />
            <span>{personalInfo.linkedin}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A passionate legal professional with a diverse background in customer support, 
            content moderation, and 3D printing entrepreneurship. 
            I blend analytical thinking with creative problem-solving to deliver exceptional results.
          </p>
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 bg-gray-100 dark:bg-gray-800 rounded-full animate-bounce focus:outline-none"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>
    </AnimatedSection>
  );
};

export default HeroSection;
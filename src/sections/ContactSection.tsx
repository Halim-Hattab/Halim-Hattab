import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, Linkedin } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const ContactSection: React.FC = () => {
  return (
    <AnimatedSection id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Let's Connect
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Feel free to reach out for opportunities, collaborations, or just to say hello!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a 
            href={`mailto:${personalInfo.email}`}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full mb-4">
              <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">{personalInfo.email}</p>
          </a>
          
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full mb-4">
              <Phone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">{personalInfo.phone}</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-full mb-4">
              <Linkedin className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">LinkedIn</h3>
            <p className="text-gray-600 dark:text-gray-400">{personalInfo.linkedin}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
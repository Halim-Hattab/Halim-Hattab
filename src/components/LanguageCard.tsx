import React from 'react';
import { Language } from '../types';
import ProgressBar from './ProgressBar';
import { Globe } from 'lucide-react';

interface LanguageCardProps {
  language: Language;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
        <h3 className="font-medium text-gray-900 dark:text-white">
          {language.name}
        </h3>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {language.level}
      </p>
      
      <ProgressBar percentage={language.proficiency} />
    </div>
  );
};

export default LanguageCard;
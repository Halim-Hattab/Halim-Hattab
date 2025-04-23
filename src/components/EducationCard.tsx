import React from 'react';
import { Education } from '../types';
import { GraduationCap } from 'lucide-react';

interface EducationCardProps {
  education: Education;
}

const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-4">
        <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {education.degree}
        </h3>
      </div>
      
      <div className="mb-2">
        <p className="text-gray-700 dark:text-gray-300">{education.institution}</p>
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{education.period}</span>
        <span>{education.location}</span>
      </div>
    </div>
  );
};

export default EducationCard;
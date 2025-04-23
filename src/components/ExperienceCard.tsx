import React from 'react';
import { Experience } from '../types';
import SkillChip from './SkillChip';
import { Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  isEven: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isEven }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-4 mb-8 relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/4 flex flex-col items-center md:items-start">
        <div className="flex items-center mb-2">
          <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {experience.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{experience.company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{experience.period}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{experience.location}</p>
      </div>
      
      <div className="hidden md:block w-8 relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div className="absolute left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-500 border-4 border-white dark:border-gray-900"></div>
      </div>
      
      <div className="md:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Responsibilities:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tools:</h4>
          <div className="flex flex-wrap">
            {experience.tools.map((tool, index) => (
              <SkillChip key={index} skill={tool} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
import React from 'react';
import { SkillCategory } from '../types';
import SkillChip from './SkillChip';
import { Layers } from 'lucide-react';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-4">
        <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
        <h3 className="font-medium text-gray-900 dark:text-white">
          {category.name}
        </h3>
      </div>
      
      <div className="flex flex-wrap">
        {category.skills.map((skill, index) => (
          <SkillChip key={index} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SkillCategoryCard;
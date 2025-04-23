import React from 'react';

interface SkillChipProps {
  skill: string;
  index?: number;
}

const getRandomColor = (index?: number) => {
  const colors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  ];
  
  if (index !== undefined) {
    return colors[index % colors.length];
  }
  
  return colors[Math.floor(Math.random() * colors.length)];
};

const SkillChip: React.FC<SkillChipProps> = ({ skill, index }) => {
  const colorClass = getRandomColor(index);
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass} m-1 transition-all duration-300 hover:scale-105`}>
      {skill}
    </span>
  );
};

export default SkillChip;
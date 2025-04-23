import React from 'react';
import { Certification } from '../types';
import { Award } from 'lucide-react';

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center hover:shadow-md transition-all duration-300">
      <div className="mr-4 bg-teal-100 dark:bg-teal-900 p-2 rounded-full">
        <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          {certification.name}
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>{certification.issuer}</span>
          <span className="mx-2">•</span>
          <span>{certification.year}</span>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
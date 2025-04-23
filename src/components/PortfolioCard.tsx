import React from 'react';
import { PortfolioItem } from '../types';
import { Folder } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="aspect-video w-full overflow-hidden">
        {item.type === 'video' ? (
          <video 
            src={item.url} 
            className="w-full h-full object-cover"
            controls
          />
        ) : (
          <img 
            src={item.url} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Folder className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            {item.title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
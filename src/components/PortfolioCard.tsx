import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioItem, MediaItem } from '../types'; // Import MediaItem
import { Folder } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  const projectId = item.title.toLowerCase().replace(/\s+/g, '-');
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const firstMediaItem = item.media && item.media.length > 0 ? item.media[0] : null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getMediaSrc = (media: MediaItem | null): string => {
    if (!media) return '';
    if (typeof media.src === 'string') {
      return media.src;
    }
    // If it's an object, handle responsive video
    if (media.type === 'video' && typeof media.src === 'object') {
      return isMobile ? media.src.mobile : media.src.desktop;
    }
    // Fallback for images with object src (though unlikely based on current type)
    if (media.type === 'image' && typeof media.src === 'object') {
       return media.src.desktop; // Default to desktop for image card preview if structure allows
    }
    return ''; // Should not happen with current types
  };

  const mediaSrc = getMediaSrc(firstMediaItem);

  return (
    <Link
      to={`/portfolio/${projectId}`}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 block"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700"> {/* Added background color */}
        {firstMediaItem?.type === 'video' ? (
          <video
            key={mediaSrc} // Use the calculated src for the key
            src={mediaSrc}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : firstMediaItem?.type === 'image' ? (
          <img
            src={mediaSrc} // Use the calculated src
            alt={item.title} // Keep alt text related to the project title
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No preview available</div> // Placeholder
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
    </Link>
  );
};

export default PortfolioCard;

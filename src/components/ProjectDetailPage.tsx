import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { useParams, Link } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioData';
import { MediaItem } from '../types'; // Import MediaItem
import { ArrowLeft, ExternalLink, Play, Pause } from 'lucide-react'; // Import Play and Pause icons

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = portfolioItems.find(
    (item) => item.title.toLowerCase().replace(/\s+/g, '-') === projectId
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h2>
          <Link
            to="/"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll to top when component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Helper function to get the correct source URL based on media item and screen size
  const getSource = (media: MediaItem): string => {
    if (typeof media.src === 'string') {
      return media.src;
    }
    // Handle responsive video
    if (media.type === 'video' && typeof media.src === 'object') {
      return isMobile ? media.src.mobile : media.src.desktop;
    }
     // Handle potential responsive image (though not currently used in data)
     if (media.type === 'image' && typeof media.src === 'object') {
      return isMobile ? media.src.mobile : media.src.desktop; // Or just default to desktop: media.src.desktop
    }
    return ''; // Fallback
  };

  // State and Refs for video playback control
  const [playingStates, setPlayingStates] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // Effect to initialize playing states and attempt autoplay
  useEffect(() => {
    const initialStates: Record<number, boolean> = {};
    project.media.forEach((media, index) => {
      if (media.type === 'video') {
        initialStates[index] = true; // Assume playing initially
        // Attempt to play video shortly after render, refs should be set
        setTimeout(() => {
          videoRefs.current[index]?.play().catch(e => {
            console.error(`Autoplay failed for video ${index}:`, e);
            // If autoplay fails (e.g., browser policy), update state to paused
            setPlayingStates(prev => ({ ...prev, [index]: false }));
          });
        }, 100); // Small delay to ensure ref is attached
      }
    });
    setPlayingStates(initialStates);

    // Cleanup refs on component unmount or project change
    return () => {
      videoRefs.current = {};
    };
  }, [projectId, project.media]); // Rerun if project changes

  // Function to toggle play/pause for a specific video
  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingStates[index]) {
      video.pause();
    } else {
      video.play().catch(e => console.error(`Manual play failed for video ${index}:`, e));
    }
    setPlayingStates(prev => ({ ...prev, [index]: !prev[index] }));
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-teal-600 dark:text-teal-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {project.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Media Grid - Conditional Rendering */}
        {project.title === 'Photorealistic Product Render' ? (
          // Mosaic Grid for the specific project
          <div className="grid grid-cols-2 gap-4 mb-8">
            {project.media.slice(0, 4).map((mediaItem, index) => { // Use original index for refs/state
              const currentSrc = getSource(mediaItem);
              return (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 aspect-w-1 aspect-h-1"> {/* Maintain aspect ratio, add relative positioning */}
                  {mediaItem.type === 'video' ? (
                    <>
                      <video
                        key={currentSrc}
                        ref={el => videoRefs.current[index] = el} // Assign ref
                        src={currentSrc}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline // Removed controls and autoPlay
                        onClick={() => togglePlayPause(index)} // Toggle on video click too
                      />
                      {/* Re-add the overlay for the first responsive video */}
                      {index === 0 && typeof mediaItem.src === 'object' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-center pointer-events-none"> {/* Added pointer-events-none */}
                          <p className="text-white text-sm sm:text-base font-semibold">
                            Resize your screen to see the responsive video change.
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => togglePlayPause(index)}
                        className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
                        aria-label={playingStates[index] ? 'Pause' : 'Play'}
                      >
                        {playingStates[index] ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </>
                  ) : (
                    <img
                      src={currentSrc}
                      alt={`${project.title} - media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
             {/* Fill remaining grid cells if less than 4 items (optional, for consistent grid) */}
             {Array.from({ length: Math.max(0, 4 - project.media.length) }).map((_, i) => (
                <div key={`placeholder-${i}`} className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-w-1 aspect-h-1"></div>
             ))}
          </div>
        ) : (
          // Original Grid for other projects
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {project.media.map((mediaItem, index, arr) => {
              const currentSrc = getSource(mediaItem);
              const isFullWidth = index === 0 || index === arr.length - 1;
              const gridSpanClass = isFullWidth ? 'md:col-span-2' : '';

              return (
                <div key={index} className={`relative rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 ${gridSpanClass}`}>
                  {mediaItem.type === 'video' ? (
                    <>
                      <video
                        key={currentSrc}
                        ref={el => videoRefs.current[index] = el} // Assign ref
                        src={currentSrc}
                        className="w-full h-auto"
                        loop
                        muted
                        playsInline // Removed controls and autoPlay
                        onClick={() => togglePlayPause(index)} // Toggle on video click too
                      />
                      {/* Re-add the overlay for the first responsive video in the original grid */}
                      {index === 0 && typeof mediaItem.src === 'object' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 text-center pointer-events-none"> {/* Added pointer-events-none */}
                          <p className="text-white text-sm sm:text-base font-semibold">
                            Resize your screen to see the responsive video change.
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => togglePlayPause(index)}
                        className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
                        aria-label={playingStates[index] ? 'Pause' : 'Play'}
                      >
                        {playingStates[index] ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </>
                  ) : (
                    <img
                      src={currentSrc}
                      alt={`${project.title} - media ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* External Link */}
        {project.externalLink && (
           <div className="mt-8 text-center">
             <a
               href={project.externalLink.url}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:underline"
             >
               {project.externalLink.text}
               <ExternalLink className="w-4 h-4 ml-2" />
             </a>
           </div>
         )}

      </div>
    </div>
  );
};

export default ProjectDetailPage;

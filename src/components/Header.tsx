import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import { Menu, X } from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
}

const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

interface HeaderProps {
  isHeroVisible: boolean; // Added prop
}

const Header: React.FC<HeaderProps> = ({ isHeroVisible }) => { // Accept the prop
  const location = useLocation(); // Get current location
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = navLinks.map(link => document.getElementById(link.id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependencies remain empty as it only runs once on mount

  // Effect to handle scrolling when navigating back to home with a hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1); // Remove the '#'
      const element = document.getElementById(id);
      if (element) {
        // Use a slight delay to ensure the element is available after route change
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id); // Update active section based on hash
        }, 100); // 100ms delay, adjust if needed
      }
    }
    // If navigating to the project page, reset active section or handle differently if needed
    else if (location.pathname.startsWith('/portfolio/')) {
       // Optionally reset active section or set a specific state for project pages
       // setActiveSection(''); // Example: Reset active section
    }
  }, [location.pathname, location.hash]); // Depend on path and hash

  // Function to handle scrolling on the main page
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id); // Keep track of active section for styling
    }
    setIsMobileMenuOpen(false); // Close mobile menu after click
  };

  // Simplified click handler for Links (just close mobile menu)
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm header-blur-edge' // Added header-blur-edge
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {isHeroVisible ? 'HH' : 'Halim Hattab'} {/* Conditional rendering */}
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => {
              const isCurrentPage = location.pathname === '/';
              const commonClasses = `text-lg font-medium transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`;

              return isCurrentPage ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={commonClasses}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={handleLinkClick} // Just close mobile menu
                  className={commonClasses}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => {
              const isCurrentPage = location.pathname === '/';
              const commonClasses = `block px-3 py-2 text-xl font-medium rounded-md w-full text-left ${
                activeSection === link.id
                  ? 'text-teal-600 dark:text-teal-400 bg-gray-100 dark:bg-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`;

              return isCurrentPage ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={commonClasses}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={handleLinkClick} // Just close mobile menu
                  className={commonClasses}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

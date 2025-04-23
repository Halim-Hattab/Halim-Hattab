import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 sm:px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {currentYear} Halim Hattab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
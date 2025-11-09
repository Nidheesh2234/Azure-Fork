import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-colors duration-500
        bg-gradient-to-b from-orange-100 to-orange-50 dark:from-gray-700 dark:to-gray-800
        hover:from-orange-200 hover:to-orange-100 dark:hover:from-gray-600 dark:hover:to-gray-700
        border border-orange-200 dark:border-gray-600
        shadow-lg hover:shadow-xl
        group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun 
          className={`w-6 h-6 absolute transition-all duration-500 transform
            ${theme === 'dark' ? 'rotate-0 scale-100 text-gray-300' : '-rotate-90 scale-0 text-orange-600'}
            group-hover:text-yellow-500 dark:group-hover:text-yellow-300`}
        />
        {/* Moon icon */}
        <Moon 
          className={`w-6 h-6 absolute transition-all duration-500 transform
            ${theme === 'light' ? 'rotate-0 scale-100 text-gray-500' : '90 scale-0 text-gray-300'}
            group-hover:text-indigo-400 dark:group-hover:text-indigo-300`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
        px-2 py-1 text-xs font-medium
        bg-white dark:bg-gray-800 
        text-gray-600 dark:text-gray-300
        rounded-md shadow-lg
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        whitespace-nowrap">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </span>
    </button>
  );
};

export default ThemeSwitcher;
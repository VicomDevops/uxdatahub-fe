import React from 'react';
import { Languages } from 'lucide-react';

export const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            currentLanguage === 'en'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('fr')}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            currentLanguage === 'fr'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          FR
        </button>
      </div>
    </div>
  );
};
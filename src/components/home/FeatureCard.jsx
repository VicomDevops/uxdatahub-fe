import React from 'react';
import * as LucideIcons from 'lucide-react';

export const FeatureCard = ({ icon, title, description }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Circle;

  return (
    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
          <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};
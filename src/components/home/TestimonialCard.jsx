import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialCard = ({ quote, author, role }) => {
  const randomId = Math.floor(Math.random() * 1000000);
  const fallbackImage =
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face';

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="space-y-4">
        <Quote className="w-8 h-8 text-blue-600" />
        <p className="text-gray-700 text-lg leading-relaxed italic">"{quote}"</p>
        <div className="flex items-center space-x-3">
          <img
            src={`https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face`}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
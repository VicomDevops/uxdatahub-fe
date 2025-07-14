import React from 'react';
import { Check, Star } from 'lucide-react';

export const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular = false
}) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
      popular ? 'ring-2 ring-blue-600 scale-105' : 'hover:scale-105'
    }`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>Most Popular</span>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-baseline justify-center space-x-1">
            <span className="text-4xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-600">{period}</span>
          </div>
          <p className="text-gray-600 mt-4">{description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
          popular
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}>
          {cta}
        </button>
      </div>
    </div>
  );
};

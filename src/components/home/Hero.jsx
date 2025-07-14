import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export const Hero = ({ content }) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {content.hero.headline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.hero.subheadline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <span>{content.hero.cta1}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold text-lg">
                <Play className="w-5 h-5" />
                <span>{content.hero.cta2}</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop&crop=face"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-sm text-gray-600">500+ teams</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-blue-100 h-4 rounded w-3/4"></div>
                  <div className="bg-purple-100 h-4 rounded w-1/2"></div>
                  <div className="bg-teal-100 h-4 rounded w-2/3"></div>
                  <div className="bg-gray-100 h-20 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Test Now</div>
                    <div className="border border-gray-300 px-4 py-2 rounded text-sm">Results</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
              <div className="text-xs text-gray-600">Insights ready</div>
              <div className="text-lg font-bold text-green-600">2.5min</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="text-xs text-gray-600">User feedback</div>
              <div className="text-lg font-bold text-blue-600">98%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
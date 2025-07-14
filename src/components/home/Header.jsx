import React, { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

export const Header = ({ content, language, onLanguageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">UX DATAHUB</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">
                {content.nav.features}
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">
                {content.nav.pricing}
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition">
                {content.nav.about}
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">
                {content.nav.contact}
              </a>
            </nav>

            {/* CTA and Language Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle currentLanguage={language} onLanguageChange={onLanguageChange} />
              <button
                onClick={() => window.location.href = '/login'}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {content.nav.login}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                {content.nav.demo}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageToggle currentLanguage={language} onLanguageChange={onLanguageChange} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition">
                  {content.nav.features}
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">
                  {content.nav.pricing}
                </a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition">
                  {content.nav.about}
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">
                  {content.nav.contact}
                </a>
                <hr className="border-gray-200" />
                <button
                  onClick={() => window.location.href = '/login'}
                  className="text-gray-600 hover:text-blue-600 transition text-left"
                >
                  {content.nav.login}
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-left">
                  {content.nav.demo}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
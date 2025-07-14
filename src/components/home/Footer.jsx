import React from 'react';
import { Brain, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = ({ content }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">UX DATAHUB</span>
            </div>
            <p className="text-gray-400">
              {content.footer.description}
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {content.footer.links.product.map((link, index) => (
                <li key={index}>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {content.footer.links.company.map((link, index) => (
                <li key={index}>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {content.footer.links.support.map((link, index) => (
                <li key={index}>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 UX DATAHUB. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</a>
            <a href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
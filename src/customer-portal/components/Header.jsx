import React, { useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-customer-ui-surface shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-customer-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-2 text-xl font-bold text-customer-ui-text-primary">
                Fylo MLM
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-customer-ui-text-primary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a
              href="#packages"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Packages
            </a>
            <a
              href="#faq"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button>
            <button className="flex items-center px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-all duration-200 font-medium shadow-soft hover:shadow-medium">
              <User className="w-4 h-4 mr-2" />
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-customer-ui-text-primary hover:text-customer-brand-500 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-customer-ui-surface border-t border-customer-ui-border">
              <a
                href="#home"
                className="block px-3 py-2 text-customer-ui-text-primary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#packages"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
                <button className="w-full flex items-center justify-center px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-all duration-200 font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

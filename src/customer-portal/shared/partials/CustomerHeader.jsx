import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogIn } from "lucide-react";
import { useAuthStore } from "../../../app/store";
import LogoutButton from "../components/LogoutButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

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
            <Link
              to="/"
              className="text-customer-ui-text-primary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Features
            </Link>
            <Link
              to="/packages"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Packages
            </Link>
            <Link
              to="/faq"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4 py-2 text-customer-ui-text-primary">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name || "User"}
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-all duration-200 font-medium shadow-soft hover:shadow-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  Register
                </Link>
              </>
            )}
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
              <Link
                to="/"
                className="block px-3 py-2 text-customer-ui-text-primary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/packages"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                to="/faq"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-customer-ui-text-secondary hover:text-customer-brand-500 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="w-full flex items-center justify-center px-4 py-2 text-customer-ui-text-primary font-medium">
                      <User className="w-4 h-4 mr-2" />
                      {user?.name || "User"}
                    </div>
                    <div className="w-full flex justify-center">
                      <LogoutButton className="w-full flex items-center justify-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium" />
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

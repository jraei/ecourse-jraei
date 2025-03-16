
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: "Services", link: "#services" },
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "FAQ", link: "#faq" },
  { name: "Contact", link: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-4 px-6 md:px-10",
        scrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="relative z-50 flex items-center">
          <div className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-brand-purple shadow-glow-sm">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-display font-bold text-xl text-gray-900">
            TINPED <span className="text-brand-purple">SMM</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-brand-purple hover:bg-brand-light transition-colors duration-200 font-medium hover-lift"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/login"
            className="font-medium text-gray-700 hover:text-brand-purple transition-colors duration-200"
          >
            Login
          </a>
          <a
            href="/register"
            className="btn-shine px-5 py-2.5 bg-brand-purple text-white rounded-full shadow-glow-sm hover:shadow-glow-md transition-all duration-300 font-medium"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-gray-700 hover:text-brand-purple"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out flex flex-col items-center justify-center md:hidden",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <ul className="flex flex-col space-y-6 items-center">
            {menuItems.map((item, index) => (
              <li key={index} className="w-full text-center">
                <a
                  href={item.link}
                  onClick={toggleMenu}
                  className="block px-4 py-2 text-xl font-medium text-gray-800 hover:text-brand-purple transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <div className="pt-6 w-full flex flex-col space-y-4 items-center">
              <a
                href="/login"
                onClick={toggleMenu}
                className="w-64 py-3 text-center font-medium text-gray-700 hover:text-brand-purple transition-colors duration-200"
              >
                Login
              </a>
              <a
                href="/register"
                onClick={toggleMenu}
                className="w-64 py-3 text-center bg-brand-purple text-white rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 font-medium"
              >
                Register
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

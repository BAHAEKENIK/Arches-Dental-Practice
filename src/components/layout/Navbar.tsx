import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '../../i18n/config';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  // Added 'team' link between services and gallery
  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'team', label: t('nav.team') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') },
  ];

  // Background: transparent at top, black in dark mode / white in light mode when scrolled
  const getBgClass = () => {
    if (isOpen) {
      return resolvedTheme === 'dark' ? 'bg-black' : 'bg-primary-white';
    }
    if (scrolled) {
      return resolvedTheme === 'dark'
        ? 'bg-black/95 backdrop-blur-xl shadow-lg'
        : 'bg-primary-white/95 backdrop-blur-xl shadow-lg';
    }
    return 'bg-transparent';
  };

  // Text colour: always follows theme (black in light, white in dark)
  const getTextColorClass = () => {
    return resolvedTheme === 'dark' ? 'text-white' : 'text-black';
  };

  // Logo: always follows theme (black in light, white in dark) – bigger size
  const getLogoClass = () => {
    const size = 'h-16 md:h-20 w-auto object-contain transition-all duration-300';
    const color = resolvedTheme === 'dark' ? 'brightness-0 invert' : 'brightness-0';
    return `${size} ${color}`;
  };

  // WhatsApp API URL for booking
  const whatsappBookingUrl =
    'https://api.whatsapp.com/send/?phone=34672164131&text&type=phone_number&app_absent=0';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${getBgClass()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo – always matches theme, bigger */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/images/logo.png"
              alt="Arches Dental Practice"
              className={getLogoClass()}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary-turquoise cursor-pointer ${getTextColorClass()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side: Language, Theme, CTA */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative hidden md:flex items-center space-x-1">
              {['es', 'en', 'fr'].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                    i18n.language === lng
                      ? 'bg-primary-turquoise text-white'
                      : `${getTextColorClass()} hover:bg-primary-turquoise/20`
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:bg-primary-turquoise/10 transition-colors ${getTextColorClass()}`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-300" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button – WhatsApp booking */}
            <a
              href={whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-primary-turquoise text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-ocean transition-all hover:scale-105 shadow-lg"
            >
              {t('nav.book')}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${getTextColorClass()}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 z-60 bg-primary-white dark:bg-black overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-start gap-6 px-8 py-10 text-xl font-medium">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-text dark:text-white hover:text-primary-turquoise transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-turquoise text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-ocean transition-all"
              >
                {t('nav.book')}
              </a>
              <div className="flex space-x-4 mt-4">
                {['es', 'en', 'fr'].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                      i18n.language === lng
                        ? 'bg-primary-turquoise text-white'
                        : 'bg-primary-lightAqua text-text dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
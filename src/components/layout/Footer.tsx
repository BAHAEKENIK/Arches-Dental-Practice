import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const isDark = resolvedTheme === 'dark';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'team', label: t('nav.team') },        // added Team link
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <footer className={`footer-section ${isDark ? 'dark' : 'light'}`}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Logo & Brand */}
          <div>
            <img
              src="/images/logo.png"
              alt="Arches Dental Practice"
              className="footer-logo"
            />
            <p className="footer-tagline">
              {t('footer.tagline', 'Premium dental care with a human touch.')}
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/profile.php?id=61576667884729"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=34672164131&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="footer-heading">
              {t('footer.quickLinks', 'Quick Links')}
            </h3>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="footer-link-btn"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="footer-heading">
              {t('footer.contact', 'Contact')}
            </h3>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <FiPhone className="contact-icon" />
                <span>672 164 131</span>
              </li>
              <li className="contact-item">
                <FiMail className="contact-icon" />
                <span>ARCHESDENTALCLINIC@HOTMAIL.ES</span>
              </li>
              <li className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>{t('footer.address', 'Calle Los Arcos, 19, 03170 Cdad. Quesada, Alicante, Spain')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          {t('footer.copyright', '© {year} Arches Dental Practice. All rights reserved.', {
            year: currentYear,
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
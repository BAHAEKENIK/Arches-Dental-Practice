import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { FaStar, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import './About.css';

const About: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const yearsCount = useMotionValue(0);
  const ratingCount = useMotionValue(0);
  const patientsCount = useMotionValue(0);

  const roundedYears = useTransform(yearsCount, (v) => Math.round(v));
  const roundedRating = useTransform(ratingCount, (v) => v.toFixed(1));
  const roundedPatients = useTransform(patientsCount, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(yearsCount, 20, { duration: 2, ease: 'easeOut' });
      animate(ratingCount, 4.9, { duration: 2, ease: 'easeOut' });
      animate(patientsCount, 3000, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, yearsCount, ratingCount, patientsCount]);

  const isDark = resolvedTheme === 'dark';

  return (
    <section id="about" ref={sectionRef} className={`about-section ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container">
        {/* Decorative blur */}
        <div className="about-blur" />

        <div className="about-grid">
          {/* Left Column: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-logo-wrapper"
          >
            <div className="about-logo-container">
              <div className="about-logo-glow" />
              <div className="about-logo-card">
                <img
                  src="/images/logo.png"
                  alt="Arches Dental Practice"
                  className="about-logo"
                />
                <div className="about-logo-ring" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="about-content">
            {/* Heading – no shadow, solid colour based on theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="about-heading-wrapper"
            >
              <h2 className="about-heading">
                {t('about.heading', 'About Us')}
              </h2>
              <p className="about-subtitle">
                {t('about.subtitle', 'Your trusted dental clinic in Ciudad Quesada, Rojales since 2006.')}
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="about-description"
            >
              <h3 className="about-who">{t('about.whoWeAre', 'Who We Are')}</h3>
              <p className="about-text">
                {t('about.description1', 'At Arches British Dental Practice, we combine experience, advanced techniques, and a patient-focused approach to deliver exceptional dental care for residents and visitors of Ciudad Quesada and the surrounding Rojales area.')}
              </p>
              <p className="about-text">
                {t('about.description2', 'As a well-established clinic with a trusted reputation since 2006, we provide gentle, reliable, and professional treatments for patients of all ages. Whether you need routine check-ups, cosmetic improvements, restorative solutions, or urgent dental attention, our team of highly trained professionals is here to help.')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="about-stats"
            >
              <div className="stat-item">
                <div className="stat-number">
                  <motion.span>{roundedYears}</motion.span>+
                </div>
                <div className="stat-label">
                  <FaCalendarAlt className="stat-icon" />
                  {t('about.years', 'Years')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <motion.span>{roundedRating}</motion.span>
                </div>
                <div className="stat-label">
                  <FaStar className="stat-icon star" />
                  {t('about.rating', 'Rating')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <motion.span>{roundedPatients}</motion.span>
                </div>
                <div className="stat-label">
                  <FaUsers className="stat-icon" />
                  {t('about.patients', 'Happy Patients')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useTheme } from '../../hooks/useTheme';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaWhatsapp,
} from 'react-icons/fa';
import './Contact.css';

// Environment variables (create .env file)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage(t('contact.error.fields', 'Please fill in all fields.'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'ARCHESDENTALCLINIC@HOTMAIL.ES',
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Email send failed');
      }
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
      setErrorMessage(t('contact.error.send', 'Failed to send message. Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`contact-section ${isDark ? 'dark' : 'light'}`}>
      <div className="contact-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-header"
        >
          <span className="contact-subtitle">
            {t('contact.subtitle', 'Get in Touch')}
          </span>
          <h2 className="contact-title">{t('contact.title', 'Contact Us')}</h2>
          <div className="contact-divider" />
        </motion.div>

        <div className="contact-grid">
          {/* ====== Left Column: Contact Form ====== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-card contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                <p className="contact-form-title">
                  {t('contact.form.title', 'Send us a message')}
                </p>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    {t('contact.form.name', 'Your Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('contact.form.namePlaceholder', 'John Doe')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    {t('contact.form.email', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('contact.form.emailPlaceholder', 'you@example.com')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    {t('contact.form.message', 'Your Message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder={t('contact.form.messagePlaceholder', 'Tell us how we can help...')}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="spinner" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t('contact.form.sending', 'Sending...')}
                    </span>
                  ) : (
                    t('contact.form.send', 'Send Message')
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="status-success">
                    {t('contact.success', 'Your message has been sent successfully!')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="status-error">{errorMessage}</div>
                )}
              </form>
            </div>
          </motion.div>

          {/* ====== Right Column: Info & Map ====== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="contact-info-column"
          >
            {/* Contact Info */}
            <div className="contact-card contact-info-card">
              <h3 className="contact-info-title">
                {t('contact.info.title', 'Contact Information')}
              </h3>
              <div className="contact-info-list">
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <p className="info-text">
                      {t(
                        'contact.info.address',
                        'Calle Los Arcos, 19, 03170 Cdad. Quesada, Alicante, Spain'
                      )}
                    </p>
                    <a
                      href="https://maps.app.goo.gl/q1f7RgMXKKPz41kZ8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-link"
                    >
                      {t('contact.info.directions', 'Get Directions')}
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <FaPhoneAlt className="info-icon" />
                  <a href="tel:+34672164131" className="info-link">
                    +34 672 16 41 31
                  </a>
                </div>

                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <a
                    href="mailto:ARCHESDENTALCLINIC@HOTMAIL.ES"
                    className="info-link break-all"
                  >
                    ARCHESDENTALCLINIC@HOTMAIL.ES
                  </a>
                </div>

                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <p className="info-text">{t('contact.info.hours', 'Opening Hours')}</p>
                    <p className="info-hours">
                      {t('contact.info.monFri', 'Mon–Fri: 9:00 AM – 7:00 PM')}<br />
                      {t('contact.info.sat', 'Sat: 9:00 AM – 2:00 PM')}<br />
                      {t('contact.info.sun', 'Sun: Closed')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media – Facebook, WhatsApp, Phone */}
              <div className="contact-social">
                <a
                  href="https://www.facebook.com/profile.php?id=61576667884729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <FaFacebook />
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
                <a
                  href="tel:+34672164131"
                  className="social-link"
                  aria-label="Call us"
                >
                  <FaPhoneAlt />
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="contact-card contact-map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.123456789!2d-0.7309106!3d38.064849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63af343fe6c46f%3A0xdbf2b4adbbb24641!2sArches%20Dental%20Practice!5e0!3m2!1sen!2ses!4v1689876543210"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arches Dental Practice Location"
                className="contact-map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
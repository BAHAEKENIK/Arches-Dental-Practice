import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

// Map service ID (English name) to image filename
const serviceImageMap: Record<string, string> = {
  'General Dentistry': 'General Dentistry.jpg',
  'Dental Implants': 'Dental Implants.jpg',
  'Dental Cleaning': 'Dental Cleaning.jpg',
  'Veneers & Crowns': 'Veneers.png',
  'Teeth Whitening': 'Teeth Whitening.jpg',
  'Dental Prosthetics': 'Dental Prosthetics.jpg',
  'Lip Fillers': 'Lip Fillers.jpg',
  'Chin Augmentation': 'Chin Augmentation.jpg',
  'Perioral Wrinkles': 'Perioral Wrinkles.jpg',
  'Nasolabial Fold': 'Nasolabial Fold.jpg',
  'Hyaluronic Acid': 'Hyaluronic Acid.jpg',
  'Invisible Orthodontics': 'Invisible Orthodontics.jpg',
};

// Optional image position overrides (object-position)
const posOverrides: Record<string, string> = {
  // Example: 'General Dentistry': '50% 30%',
};

const Services: React.FC = () => {
  const { t } = useTranslation();

  // Get service list from translations – each item has: id, name, description
  const services = t('services.list', { returnObjects: true }) as {
    id: string;
    name: string;
    description: string;
  }[];

  const n = services.length;

  // Helper to build a clean URL – ensures proper encoding
  const buildImageUrl = (filename: string): string => {
    // Use encodeURIComponent to handle spaces, ampersands, etc.
    return `/images/services/${encodeURIComponent(filename)}`;
  };

  return (
    <section
      className="services"
      id="services"
      style={{ '--n': n } as React.CSSProperties}
    >
      {/* grain texture, shared once, purely decorative */}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="services-grain">
          <feTurbulence type="fractalNoise" baseFrequency="7.13" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".025" />
          </feComponentTransfer>
          <feBlend in2="SourceGraphic" />
        </filter>
      </svg>

      <header className="services-intro">
        <p className="services-eyebrow">{t('services.eyebrow', 'What we treat')}</p>
        <h2 className="services-title">{t('services.title', 'Our Services')}</h2>
        <p className="services-sub">
          {t('services.sub', 'Twelve treatments, dental and aesthetic, in one continuous arc. Keep scrolling to bring each one forward.')}
        </p>
      </header>

      <div className="services-track">
        <div className="services-stage">
          <div className="services-scene">
            <div className="services-assembly">
              {services.map((service, i) => {
                const filename = serviceImageMap[service.id] || '';
                const src = buildImageUrl(filename);
                const pos = posOverrides[service.id] || '50% 50%';
                return (
                  <article
                    className="services-card"
                    key={service.id}
                    style={
                      {
                        '--i': i,
                        '--url': `url(${src})`,
                        '--pos': pos,
                      } as React.CSSProperties
                    }
                  >
                    <header className="services-card-front">
                      <h3>{service.name}</h3>
                    </header>
                    <figure className="services-card-back">
                      <img src={src} alt={service.name} loading="lazy" />
                      <figcaption>{service.description}</figcaption>
                    </figure>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
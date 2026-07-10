import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaWhatsapp, FaArrowDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll progress for parallax background
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);

  // Headline scroll-image-clip effect (direct DOM update, like the reference)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const scrolled = y !== 0;

      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      if (headlineRef.current) {
        if (scrolled) {
          headlineRef.current.style.backgroundPosition = `calc(50% + ${y}px) calc(50% + ${y}px)`;
        } else {
          headlineRef.current.style.backgroundPosition = '';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles – generated only once
  const [particles] = useState(() =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
  }))
);

  // Conditional text colors
  const textColor = resolvedTheme === 'dark' ? 'text-white' : 'text-text';
  const goldColor = resolvedTheme === 'dark' ? 'text-primary-gold' : 'text-primary-gold';
  const badgeColor = resolvedTheme === 'dark' ? 'text-white' : 'text-primary-navy';

  // Card-specific colors: all black in light, all white in dark
  const cardTextColor = resolvedTheme === 'dark' ? 'text-white' : 'text-black';
  const cardBorderColor = resolvedTheme === 'dark' ? 'border-white/20' : 'border-black/20';

  // Gooey button mouse tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      '--x',
      String(((e.clientX - rect.x) / rect.width) * 100)
    );
    e.currentTarget.style.setProperty(
      '--y',
      String(((e.clientY - rect.y) / rect.height) * 100)
    );
  };

  // Intro animation for gooey buttons
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>('.gooey-btn');
    const intervals: number[] = [];

    btns.forEach((btn) => {
      btn.style.setProperty('--a', '1');
      let i = 4;
      const id = window.setInterval(() => {
        btn.style.setProperty('--x', String(((Math.cos(i) + 2) / 3.6) * 100));
        btn.style.setProperty('--y', String(((Math.sin(i) + 2) / 3.6) * 100));
        i += 0.03;
        if (i > 11.5) {
          clearInterval(id);
          btn.style.setProperty('--a', '');
        }
      }, 16);
      intervals.push(id);

      const onOver = () => {
        clearInterval(id);
        btn.style.setProperty('--a', '');
      };
      btn.addEventListener('pointerover', onOver, { once: true });
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Overlay backgrounds – black for dark mode, white for light mode
  const overlayBg =
    resolvedTheme === 'dark'
      ? 'from-black/80 via-black/40 to-transparent'
      : 'from-primary-white/80 via-primary-white/40 to-transparent';

  const bottomOverlayBg =
    resolvedTheme === 'dark'
      ? 'from-black/80'
      : 'from-primary-white/80';

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/500142077_122099974760888929_1042645294992697612_n.jpg"
          />
          <img
            src="/images/500142077_122099974760888929_1042645294992697612_n.jpg"
            alt="Arches Dental Practice Reception"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayBg}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${bottomOverlayBg} to-transparent`} />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary-turquoise/20 dark:bg-primary-gold/20 backdrop-blur-sm"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block px-6 py-2 rounded-full bg-primary-turquoise/10 dark:bg-primary-gold/10 backdrop-blur-sm border border-primary-turquoise/30 dark:border-primary-gold/30"
            >
              <span className={`${badgeColor} font-medium text-sm tracking-wider uppercase`}>
                ✦ {t('hero.badge', 'Clínica Dental Premium')}
              </span>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <img
                src="/images/logo.png"
                alt="Arches Dental Practice"
                className="h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Headline – solid color at top, scroll image-clip effect after */}
            <div className="relative inline-block w-full lg:w-auto">
              <h1
                ref={headlineRef}
                className={`hero-headline font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight ${
                  isScrolled ? 'hero-headline--scrolled' : cardTextColor
                }`}
              >
                {t('hero.headline', 'Atención Dental Premium')}
              </h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`${textColor} text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed drop-shadow-md`}
            >
              {t('hero.subheadline', 'Where science meets elegance – advanced dentistry in a welcoming environment.')}
            </motion.p>

            {/* CTAs – only WhatsApp button remains */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.a
                href="https://api.whatsapp.com/send/?phone=34672164131&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-full bg-primary-gold text-primary-navy font-medium flex items-center justify-center gap-3 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onPointerMove={handlePointerMove}
              >
                <motion.div
                  className="absolute inset-0 bg-primary-turquoise opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <FaWhatsapp className="text-xl relative z-10" />
                <span className="relative z-10">{t('hero.whatsapp', 'WhatsApp')}</span>
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start pt-6"
            >
              <div className="flex items-center gap-2">
                <span className={`${goldColor} text-2xl font-number font-bold`}>★ 4.9</span>
                <span className={`${textColor} text-sm`}>Google Rating</span>
              </div>
              <div className={`w-px h-8 ${resolvedTheme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`} />
              <div className="flex items-center gap-2">
                <span className={`${goldColor} text-2xl font-number font-bold`}>500+</span>
                <span className={`${textColor} text-sm`}>{t('hero.patients', 'Patients')}</span>
              </div>
              <div className={`w-px h-8 ${resolvedTheme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`} />
              <div className="flex items-center gap-2">
                <span className={`${goldColor} text-2xl font-number font-bold`}>10+</span>
                <span className={`${textColor} text-sm`}>{t('hero.years', 'Years')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md" style={{ perspective: '1000px' }}>
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-primary-turquoise/30 to-primary-gold/30 animate-pulse blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-primary-gold/30 to-primary-turquoise/30 animate-pulse blur-2xl animation-delay-1000" />

              <motion.div
                className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-turquoise/10 to-primary-gold/10 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className={`font-heading text-2xl ${cardTextColor} font-bold`}>
                    {t('hero.cardTitle', 'Arches Dental Practice')}
                  </h3>
                  <p className={`${cardTextColor} text-sm font-medium mt-1`}>
                    {t('hero.cardSubtitle', 'Multidisciplinary Dental Clinic')}
                  </p>

                  <div className={`grid grid-cols-3 gap-2 mt-6 pt-4 border-t ${cardBorderColor}`}>
                    <div className="text-center">
                      <div className={`${cardTextColor} font-number font-bold text-lg`}>15+</div>
                      <div className={`${cardTextColor} text-xs opacity-70`}>{t('hero.years', 'Years')}</div>
                    </div>
                    <div className="text-center">
                      <div className={`${cardTextColor} font-number font-bold text-lg`}>500+</div>
                      <div className={`${cardTextColor} text-xs opacity-70`}>{t('hero.patients', 'Patients')}</div>
                    </div>
                    <div className="text-center">
                      <div className={`${cardTextColor} font-number font-bold text-lg`}>★4.9</div>
                      <div className={`${cardTextColor} text-xs opacity-70`}>{t('hero.reviews', 'Reviews')}</div>
                    </div>
                  </div>

                  <motion.div
                    className={`mt-4 flex items-center justify-center gap-2 ${cardTextColor} text-sm`}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span>🏥</span>
                    <span className="font-light">{t('hero.cardTagline', 'Excellence in dental care')}</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a
          href="#about"
          className={`flex flex-col items-center gap-2 transition-colors ${
            resolvedTheme === 'dark'
              ? 'text-white/60 hover:text-white'
              : 'text-text/60 hover:text-text'
          }`}
        >
          <span className="text-xs uppercase tracking-wider font-light">{t('hero.scroll', 'Scroll')}</span>
          <FaArrowDown className="text-xl" />
        </a>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-primary-turquoise/10 to-primary-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-gold/10 to-primary-turquoise/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
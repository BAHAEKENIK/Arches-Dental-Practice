import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaHeart,
  FaShare,
  FaGoogle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

// All reviews from Google Business Profile
const allReviews = [
  {
    id: 1,
    name: 'Amanda Frape',
    rating: 5,
    date: 'a month ago',
    text: 'Appointment given & seen very quickly, even though not really an emergency... Seen by lovely Dentist, and assistant. On arrival receptionist very nice, I completed a small health check …',
    likes: 0,
    isLiked: false,
  },
  {
    id: 2,
    name: 'Derek Sullivan',
    rating: 5,
    date: '3 weeks ago',
    text: 'I had a filling fall out this week and booked to see Caixa. I attended this morning and was treated ontime and treated in a very professional and supportive manner. I was all for having the tooth extracted but Caixa impressed on me that …',
    likes: 0,
    isLiked: false,
  },
  {
    id: 3,
    name: 'Ian West',
    rating: 5,
    date: '7 months ago',
    text: 'After bad tooth ache on Wednesday I booked a midday appointment for Friday. My tooth had serious decay into the root and after Xrays it was obvious it could not be saved. The dentist said she would remove it immediately and did. I was only there for 45 minutes max and also have to say that I have had a number of teeth removed and this was the best experience of them all by far. Thank you to all the team at the Arches Dental Practice I can not recommend you all highly enough',
    likes: 0,
    isLiked: false,
  },
  {
    id: 4,
    name: 'DAVID IRVINE',
    rating: 5,
    date: '12 months ago',
    text: 'Amazing dentist. Just had an extraction and didn\'t even realised the lovely dentist had taken it out. Amazing thank you. 🦷',
    likes: 0,
    isLiked: false,
  },
  {
    id: 5,
    name: 'Adam Taylor',
    rating: 5,
    date: '1 year ago',
    text: 'I visit this dentist whilst visiting my parents in Spain. This is a much cheaper way to receive dental treatments than using the UK dentists which is now a simply broken system in the UK. This time I had a full clean and polish and cannot find any fault. The staff as always are top notch are really helpful. The quality of the work done was fantastic and the price - 50 euros for a clean which is a fraction of UK prices. Highly recommend.',
    likes: 0,
    isLiked: false,
  },
  {
    id: 6,
    name: 'Leg San',
    rating: 5,
    date: '1 year ago',
    text: 'This dental practice has been the one my family and I have trusted for over ten years. The staff are always wonderfully friendly, attentive, and have a near-magical ability to put you at ease. I would highly recommend this practice to anyone as it\'s professional, welcoming, and never feels daunting to enter. It\'s the kind of place where someone who suffers from dental anxiety (I\'ve been there) can feel their stress melt away and get the important care they need. The pricing is also fair and reflects the compassionate nature of the people who work there.',
    likes: 0,
    isLiked: false,
  },
  {
    id: 7,
    name: 'Clayton Dean',
    rating: 5,
    date: '1 year ago',
    text: 'Came to visit parents and booked some dental work while here. Arranged all with I think Tamara on front desk very very helpful and professional. Then had appt with Tasha ? and Meghan ? Arches is so clean and well appointed. My treatments were very thorough well explained and so far so good had tooth extrac today. Will book for other things needed. Prices excellent dont want to make too popular or wont be able to get appointment lol but thankyou so much......',
    likes: 0,
    isLiked: false,
  },
  {
    id: 8,
    name: 'Jennifer Elliott',
    rating: 5,
    date: '1 year ago',
    text: 'Had a tooth out didn\'t feel a thing so good',
    likes: 0,
    isLiked: false,
  },
  {
    id: 9,
    name: 'Wendy Keeley',
    rating: 5,
    date: '1 year ago',
    text: 'I am writing this a week after my wisdom tooth extraction. I was so nervous before the procedure but can honestly say I felt absolutely no pain whatsoever and didn\'t need any painkillers after. The lovely female dentist was so caring and reassuring, I can not praise her or this practice high enough.',
    likes: 0,
    isLiked: false,
  },
  {
    id: 10,
    name: 'Morinja Harwood',
    rating: 5,
    date: '6 months ago',
    text: 'Been coming to arches for 15 years and now it has changed hands, it is really excellent and they take time to check everything. The prices are good and they tell you before you have the treatment. I will most definitely carry on coming here',
    likes: 0,
    isLiked: false,
  },
  {
    id: 11,
    name: 'Alejandro Lermas',
    rating: 5,
    date: '7 months ago',
    text: 'Im so happy with all the staff, and the dentist its so good, she was so nice and careful no pain at all. Thanks to all',
    likes: 0,
    isLiked: false,
  },
  {
    id: 12,
    name: 'John Tina Thatcher',
    rating: 5,
    date: '1 year ago',
    text: 'I have recently had an implant it was totally painless, Tamara on-reception was great and rang me a day after to ask if I was ok. Great practice.',
    likes: 0,
    isLiked: false,
  },
  {
    id: 13,
    name: 'Jenny Elliot',
    rating: 5,
    date: '1 year ago',
    text: 'I had a bridge done with Maria, she was so gentle and put me at ease, will definitely recommend people to go there, I am so happy with the result',
    likes: 0,
    isLiked: false,
  },
];

// Avatar color palette
const avatarColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-violet-500',
  'from-teal-500 to-cyan-500',
  'from-amber-500 to-yellow-500',
  'from-rose-500 to-pink-500',
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return avatarColors[hash % avatarColors.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return parts
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Like state
  const [likesState, setLikesState] = useState(
    allReviews.map((r) => ({ id: r.id, likes: r.likes, isLiked: r.isLiked }))
  );

  // Auto-rotation
  useEffect(() => {
    if (isPaused || allReviews.length === 0) return;

    const interval = 6000; // 6 seconds
    const step = 50; // update every 50ms
    const increment = 100 / (interval / step);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % allReviews.length);
          setProgress(0); // reset progress when changing slide
          return 0;
        }
        return next;
      });
    }, step);

    return () => clearInterval(timer);
  }, [allReviews.length, isPaused]);

  // Navigation functions – reset progress manually
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
    setProgress(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
    setProgress(0);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const toggleLike = (id: number) => {
    setLikesState((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Review',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const currentReview = allReviews[currentIndex];
  const currentLikes =
    likesState.find((item) => item.id === currentReview?.id) || { likes: 0, isLiked: false };

  // Distribution data
  const distribution = [
    { stars: 5, count: 34 },
    { stars: 4, count: 2 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 1 },
  ];
  const totalReviews = distribution.reduce((sum, d) => sum + d.count, 0);

  // Render stars
  const renderStars = (rating: number, delayBase = 0) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const stars = [];
    let i = 0;
    for (let f = 0; f < full; f++) {
      stars.push(
        <motion.span
          key={`full-${f}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delayBase + i * 0.1, type: 'spring', stiffness: 300 }}
        >
          <FaStar className="text-yellow-400 inline-block" />
        </motion.span>
      );
      i++;
    }
    if (half) {
      stars.push(
        <motion.span
          key="half"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delayBase + i * 0.1, type: 'spring', stiffness: 300 }}
        >
          <FaStarHalfAlt className="text-yellow-400 inline-block" />
        </motion.span>
      );
      i++;
    }
    for (let e = 0; e < empty; e++) {
      stars.push(
        <motion.span
          key={`empty-${e}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delayBase + i * 0.1, type: 'spring', stiffness: 300 }}
        >
          <FaRegStar className="text-yellow-400 inline-block" />
        </motion.span>
      );
    }
    return stars;
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <section
      id="testimonials"
      className={`py-20 md:py-32 ${
        isDark ? 'bg-[#0B1210]' : 'bg-[#f7f5f2]'
      } overflow-hidden`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-primary-turquoise dark:text-primary-gold font-medium text-sm tracking-wider uppercase">
            {t('testimonials.subtitle', 'What our patients say')}
          </span>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mt-2 text-text dark:text-white">
            {t('testimonials.title', 'Patient Testimonials')}
          </h2>
          <div className="w-20 h-1 bg-primary-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Google-style Summary */}
        <div
          className={`${
            isDark ? 'bg-white/5' : 'bg-white'
          } rounded-2xl shadow-xl p-6 md:p-8 mb-8 border ${
            isDark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating score */}
            <div className="flex flex-col items-center md:items-start">
              <div
                className={`text-4xl md:text-5xl font-number font-bold ${
                  isDark ? 'text-white' : 'text-text'
                }`}
              >
                4.9
              </div>
              <div className="flex items-center gap-1 my-1">{renderStars(4.9, 0)}</div>
              <div className={`text-sm ${isDark ? 'text-white/70' : 'text-text/70'}`}>
                {totalReviews} {t('testimonials.reviews', 'reviews')}
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-1.5">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium w-6 text-right ${
                      isDark ? 'text-white/70' : 'text-text/70'
                    }`}
                  >
                    {d.stars}
                  </span>
                  <FaStar className="text-yellow-400 text-xs" />
                  <div
                    className={`flex-1 h-2 ${
                      isDark ? 'bg-white/10' : 'bg-gray-200'
                    } rounded-full overflow-hidden`}
                  >
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(d.count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs w-8 ${
                      isDark ? 'text-white/70' : 'text-text/70'
                    }`}
                  >
                    {d.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Google logo */}
            <div className="flex flex-col items-center md:items-end justify-center">
              <FaGoogle className="text-3xl text-blue-500 mb-2" />
              <span className={`text-sm ${isDark ? 'text-white/70' : 'text-text/70'}`}>
                {t('testimonials.google', 'Google Reviews')}
              </span>
            </div>
          </div>
        </div>

        {/* Main Review Card */}
        {currentReview && (
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Progress Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                isDark ? 'bg-white/10' : 'bg-gray-200'
              } rounded-t-2xl overflow-hidden z-10`}
            >
              <motion.div
                className="h-full bg-primary-gold rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Card */}
            <div
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } rounded-3xl shadow-2xl p-6 md:p-10 border ${
                isDark ? 'border-white/10' : 'border-gray-200'
              } backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300 relative overflow-hidden`}
            >
              {/* Decorative gradient border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-turquoise/20 via-primary-gold/10 to-transparent ${
                  isDark ? 'opacity-30' : 'opacity-50'
                } pointer-events-none`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  {/* Header: Avatar, Name, Rating */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(
                          currentReview.name
                        )} text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-primary-turquoise/20`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      >
                        {getInitials(currentReview.name)}
                      </motion.div>
                      <div>
                        <h4
                          className={`font-heading text-xl ${
                            isDark ? 'text-white' : 'text-text'
                          }`}
                        >
                          {currentReview.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {renderStars(currentReview.rating, 0.2)}
                          </div>
                          <span
                            className={`text-xs ${
                              isDark ? 'text-white/60' : 'text-text/60'
                            }`}
                          >
                            · {currentReview.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => toggleLike(currentReview.id)}
                        className={`${
                          isDark ? 'text-white/60 hover:text-red-400' : 'text-text/60 hover:text-red-500'
                        } transition-colors flex items-center gap-1`}
                      >
                        <FaHeart className={currentLikes.isLiked ? 'text-red-500' : ''} />
                        <span className="text-sm">{currentLikes.likes}</span>
                      </button>
                      <button
                        onClick={() => handleShare(currentReview.text)}
                        className={`${
                          isDark ? 'text-white/60 hover:text-primary-gold' : 'text-text/60 hover:text-primary-turquoise'
                        } transition-colors`}
                      >
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  {/* Review Text */}
                  <motion.p
                    className={`${
                      isDark ? 'text-white/80' : 'text-text/80'
                    } text-base md:text-lg leading-relaxed`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  >
                    {currentReview.text}
                  </motion.p>

                  {/* Translate button */}
                  <button
                    className={`mt-4 text-sm text-primary-turquoise dark:text-primary-gold hover:underline`}
                  >
                    {t('testimonials.translate', 'Translate')}
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className={`absolute left-2 top-1/2 -translate-y-1/2 ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/80 hover:bg-white'
                } backdrop-blur-sm p-2 rounded-full shadow-lg transition-colors z-20 hidden md:block`}
                aria-label="Previous"
              >
                <FaChevronLeft className={isDark ? 'text-white' : 'text-text'} />
              </button>
              <button
                onClick={goToNext}
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/80 hover:bg-white'
                } backdrop-blur-sm p-2 rounded-full shadow-lg transition-colors z-20 hidden md:block`}
                aria-label="Next"
              >
                <FaChevronRight className={isDark ? 'text-white' : 'text-text'} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {allReviews.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-primary-turquoise dark:bg-primary-gold w-8'
                      : isDark
                      ? 'bg-white/20 w-2'
                      : 'bg-gray-300 w-2'
                  }`}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
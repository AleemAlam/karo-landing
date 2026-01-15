'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HoverScale } from './MotionWrapper';
import { Link } from '@/i18n/navigation';

export default function FoundersEditionSection() {
  const t = useTranslations('foundersEdition');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      title: t('benefit1Title'),
      subtitle: t('benefit1Subtitle'),
    },
    {
      title: t('benefit2Title'),
      subtitle: t('benefit2Subtitle'),
    },
    {
      title: t('benefit3Title'),
      subtitle: t('benefit3Subtitle'),
    },
    {
      title: t('benefit4Title'),
      subtitle: t('benefit4Subtitle'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div ref={ref}>
      {/* Mobile Layout */}
      <section className="lg:hidden py-12 bg-white">
        <div className="px-4 mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-left mb-8"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              {t('heading')}
            </h2>

            <p className="text-base mb-2">
              <span className="text-orange-500 font-semibold">{t('highlightText')}</span>{' '}
              <span className="text-gray-700">{t('description')}</span>
            </p>

            <p className="text-gray-600 text-sm">
              {t('subDescription')}
            </p>
          </motion.div>

          {/* Benefits Grid - 2x2 */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-[#F3F3EF] p-4 text-center"
              >
                {/* Checkmark Icon */}
                <motion.div
                  className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="font-semibold text-black text-sm mb-1">
                  {benefit.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-gray-500">
                  {benefit.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link href="/buy" className="w-full bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-6 py-4 transition-colors duration-300 inline-flex items-center justify-center gap-3 shadow-lg cursor-pointer text-sm">
              {t('button')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden lg:block py-20 bg-white">
        <div className="px-20 mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 relative z-50"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="text-5xl font-bold text-black mb-12">
              {t('heading')}
            </h2>

            <p className="text-lg mb-2">
              <span className="text-orange-500 font-semibold">{t('highlightText')}</span>{' '}
              <span className="text-gray-700">{t('description')}</span>
            </p>

            <p className="text-gray-600 text-base whitespace-pre-line">
              {t('subDescription')}
            </p>
          </motion.div>

          {/* Benefits Grid - 4 columns */}
          <motion.div
            className="grid grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 }
                }}
                className="bg-[#F3F3EF] p-6 text-center border border-gray-100"
              >
                {/* Checkmark Icon */}
                <motion.div
                  className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                {/* Title */}
                <h3 className="font-semibold text-black text-base mb-1">
                  {benefit.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {benefit.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <HoverScale scale={1.03}>
              <Link href="/buy" className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-8 py-4 transition-colors duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer text-base">
                {t('button')}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </Link>
            </HoverScale>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

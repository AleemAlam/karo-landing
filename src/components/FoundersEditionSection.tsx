'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HoverScale } from './MotionWrapper';

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
        ease: [0.25, 0.1, 0.25, 1],
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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="px-40 mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 relative z-50"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12">
            {t('heading')}
          </h2>
          
          <p className="text-lg mb-2">
            <span className="text-orange-500 font-semibold">{t('highlightText')}</span>{' '}
            <span className="text-gray-700">{t('description')}</span>
          </p>
          
          <p className="text-gray-600 whitespace-pre-line">
            {t('subDescription')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
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
              <h3 className="font-semibold text-black mb-1">
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
            <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-8 py-4 transition-colors duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer">
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
            </button>
          </HoverScale>
        </motion.div>
      </div>
    </section>
  );
}

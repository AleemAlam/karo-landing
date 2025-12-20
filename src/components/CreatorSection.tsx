'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FloatElement, HoverScale } from './MotionWrapper';

export default function CreatorSection() {
  const t = useTranslations('creator');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        type: 'spring' as const,
        stiffness: 200,
      },
    },
  };

  return (
    <section className="bg-[#f7f5f2] max-h-[678px]" ref={ref}>
      <div className="px-40 mx-auto">
        <motion.div
          className="flex items-center gap-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Left Image */}
          <motion.div className="flex-1 relative" variants={imageVariants}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Image
                src="/karo-1.png"
                alt="Program creator"
                width={520}
                height={720}
                className="object-contain relative -top-11"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <Image
                src="/karo-2.png"
                alt="Program creator"
                width={357}
                height={357}
                className="object-contain absolute top-80 right-24"
              />
            </motion.div>
            {/* Floating circular badge */}
            <FloatElement>
              <motion.div 
                className="absolute top-[290px] right-[140px] w-[92px] h-[92px] bg-white rounded-full shadow-xl flex items-center justify-center z-10"
                variants={badgeVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <span className="text-gray-800 text-sm font-medium text-center leading-tight px-2 whitespace-pre-line">
                  {t('badge')}
                </span>
              </motion.div>
            </FloatElement>
          </motion.div>

          {/* Right Content */}
          <motion.div className="flex-1 space-y-6" variants={containerVariants}>
            {/* Book Icon */}
            <motion.div variants={itemVariants}>
              <Image
                src="/Open-book.png"
                alt="Book Icon"
                width={64}
                height={64}
                className="object-contain"
              />
            </motion.div>

            {/* Heading */}
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-black leading-tight"
              variants={itemVariants}
            >
              {t('heading')} <br/><span className="text-orange-500">{t('headingHighlight')}</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              className="text-xl font-semibold text-black"
              variants={itemVariants}
            >
              {t('subtitle')}
            </motion.p>

            {/* Description */}
            <motion.p 
              className="text-gray-600 text-[15px] leading-relaxed"
              variants={itemVariants}
            >
              {t('description')}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <HoverScale>
                <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-8 py-4 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

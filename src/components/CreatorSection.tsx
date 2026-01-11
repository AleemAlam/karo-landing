'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HoverScale } from './MotionWrapper';

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
    <section className="bg-[#f7f5f2] lg:max-h-[678px]" ref={ref}>
      {/* Mobile Layout */}
      <div className="lg:hidden py-12">
        <motion.div
          className="flex flex-col"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Book Icon */}
          <motion.div variants={itemVariants} className="mb-4 px-4">
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
            className="text-[28px] font-bold text-black leading-tight mb-6 px-4"
            variants={itemVariants}
          >
            {t('heading')} <br /><span className="text-orange-500">{t('headingHighlight')}</span>
          </motion.h2>

          {/* Images Container */}
          <motion.div
            className="relative w-full mb-0"
            variants={imageVariants}
          >
            {/* Main creator image */}
            <Image
              src="/founder-story.png"
              alt="Program creator"
              width={375}
              height={449}
              className="object-contain w-full h-auto"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg font-bold text-black -mt-16 mb-4 px-4"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-gray-600 text-sm leading-relaxed mb-6 px-4"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="w-full px-4">
            <button className="w-full bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-6 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg cursor-pointer text-sm">
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
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block px-20 mx-auto">
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
                className="object-contain absolute top-40 -right-12"
              />
            </motion.div>
            {/* Floating circular badge */}
            <motion.div
              className="absolute top-[120px] right-0 w-[92px] h-[92px] bg-white rounded-full shadow-xl flex items-center justify-center z-10"
              variants={badgeVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span className="text-gray-800 text-sm font-medium text-center leading-tight px-2 whitespace-pre-line">
                {t('badge')}
              </span>
            </motion.div>
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
              className="text-[40px] font-bold text-black leading-tight"
              variants={itemVariants}
            >
              {t('heading')} <br /><span className="text-orange-500">{t('headingHighlight')}</span>
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

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HoverScale } from './MotionWrapper';

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      image: '/image-1.png',
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      image: '/image-2.png',
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      image: '/image-3.png',
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
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
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="text-center"
            >
              {/* Image */}
              <motion.div 
                className="mb-6 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  width={450}
                  height={450}
                  className="w-full h-[450px] object-cover"
                />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-4">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
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

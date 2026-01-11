'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StatsSection() {
  const t = useTranslations('stats');
  const heroT = useTranslations('hero');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { value: '92%', label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: '87%', label: t('stat3Label') },
    { value: '85%', label: t('stat4Label') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <>
      {/* Mobile Layout - 2x2 Grid */}
      <section className="lg:hidden bg-white">
        {/* Orange top border */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`py-8 px-4 text-center relative ${
                // Add right border for left column items (index 0, 2)
                index % 2 === 0 ? 'border-r border-gray-300' : ''
                } ${
                // Add bottom border for top row items (index 0, 1)
                index < 2 ? 'border-b border-gray-300' : ''
                }`}
            >
              <motion.p
                className="text-3xl font-light text-gray-700 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: 'spring' }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits List */}
        <motion.div
          className="bg-gray-100 px-6 py-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[heroT('benefit1'), heroT('benefit2'), heroT('benefit3'), heroT('benefit4')].map((benefit, index) => (
            <motion.div
              key={index}
              className="flex gap-4 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
            >
              {/* Checkmark Icon */}
              <svg
                className="w-6 h-6 text-gray-400 flex-shrink-0 "
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <p className="text-gray-600 text-lg leading-relaxed">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Desktop Layout - Horizontal Row */}
      <section className="hidden lg:block bg-[#f7f5f2] py-8">
        <div className="px-0 mx-auto">
          <motion.div
            className="flex items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center w-full"
              >
                <div className="text-center flex-1">
                  <motion.p
                    className="text-3xl font-light text-gray-700 mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                {/* Divider - show for all except last item */}
                {index < stats.length - 1 && (
                  <motion.div
                    className="h-12 w-px bg-gray-300 self-center"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

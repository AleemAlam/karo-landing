'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StatsSection() {
  const t = useTranslations('stats');
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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="bg-[#f7f5f2] py-8">
      <div className="px-40 mx-auto">
        <motion.div 
          ref={ref}
          className="flex items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex items-center"
            >
              <div className="text-center flex-1 px-8">
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
  );
}

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FloatElement, HoverScale } from './MotionWrapper';

export default function Hero() {
  const t = useTranslations('hero');

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4'),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="bg-linear-to-br from-white via-gray-50 to-orange-50/30 py-16 lg:py-20 overflow-hidden">
      <div className="px-40 mx-auto">
        <div className="flex items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl lg:text-5xl font-bold text-black leading-tight"
              variants={itemVariants}
            >
              {t('heading1')}
              <br />
              <span className="text-gray-800">{t('heading2')}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-[20px] text-gray-600 max-w-[830px] leading-relaxed"
              variants={itemVariants}
            >
              {t('subheading')}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <HoverScale scale={1.03}>
                <button className="bg-[#F79155] hover:bg-orange-500 cursor-pointer text-white font-semibold px-8 py-4 transition-colors duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl text-lg group">
                  {t('ctaButton')}
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
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

            {/* Benefits List */}
            <motion.div className="space-y-4 pt-4" variants={itemVariants}>
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <Image
                    src="/check-1.svg"
                    alt="Check"
                    width={15}
                    height={15}
                    className='relative top-1'
                  />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Disclaimer */}
            <motion.p 
              className="text-sm text-gray-400 pt-4"
              variants={itemVariants}
            >
              {t('disclaimer')}
            </motion.p>
          </motion.div>

          {/* Right Content - Images */}
          <motion.div 
            className="relative flex justify-center lg:justify-end flex-1"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-br from-green-100/50 to-emerald-200/30 rounded-full blur-3xl" />
            
            {/* Main hero image */}
            <div className="relative z-10">
              <Image
                src="/hero/karo-hero.png"
                alt="Happy customer"
                width={500}
                height={600}
                className="object-cover w-[500px] h-[600px] shrink-0"
                priority
              />
              
              {/* Floating sunglasses */}
              <FloatElement className="absolute top-25 left4 -translate-x-1/2">
                <Image
                  src="/hero/spec.png"
                  alt="Migraine sunglasses"
                  width={285}
                  height={285}
                  className="drop-shadow-2xl rounded-[50%]"
                />
              </FloatElement>

              {/* Gift badge - Circular purple design */}
              <motion.div 
                className="absolute bottom-32 -left-20 lg:-right-12 w-[130px] h-[130px] lg:w-[150px] lg:h-[150px] bg-[#2B183D] rounded-full shadow-2xl flex flex-col items-center justify-center p-3 text-center z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Gift icon */}
                <Image
                  src="/Gift-box-with-a-bow.png"
                  alt="Gift icon"
                  width={20}
                  height={20}
                  className="mb-3"
                />
                {/* Text content */}
                <p className="text-white text-[12px] leading-4.5">{t('giftLabel')}</p>
                <p className="text-white text-[12px]">
                  <span className="font-extrabold">{t('giftValue')} </span>
                  {t('giftSubtext')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

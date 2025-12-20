'use client';

import { useState, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

export default function MigraineCostCalculator() {
  const t = useTranslations('calculator');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Input state with default values
  const [frequency, setFrequency] = useState<number>(8);
  const [workFullTime, setWorkFullTime] = useState<number>(120);
  const [workB2B, setWorkB2B] = useState<number>(200);
  const [freelance, setFreelance] = useState<number>(150);
  const [medicines, setMedicines] = useState<number>(80);
  const [lostPleasures, setLostPleasures] = useState<number>(100);

  // Calculations
  const costPerDay = useMemo(() => {
    return workFullTime + workB2B + freelance + medicines + lostPleasures;
  }, [workFullTime, workB2B, freelance, medicines, lostPleasures]);

  const monthlyCost = useMemo(() => {
    return costPerDay * frequency;
  }, [costPerDay, frequency]);

  const annualCost = useMemo(() => {
    return monthlyCost * 12;
  }, [monthlyCost]);

  const investmentAmount = 450;

  const roi = useMemo(() => {
    if (costPerDay === 0) return 0;
    return investmentAmount / costPerDay;
  }, [costPerDay]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setter(value);
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('pl-PL')} zł`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-20 mx-20 bg-[#f5f3f0]" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
        >
          {t('title')}
        </motion.h2>

        {/* Table */}
        <motion.div 
          className="bg-[#f5f3f0]"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-300"
            variants={rowVariants}
          >
            <div className="text-sm font-semibold text-gray-700">{t('columnCategory')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnDescription')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnYourData')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnCost')}</div>
          </motion.div>

          {/* Frequency Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('frequencyLabel')}</div>
            <div className="text-sm text-gray-500">{t('frequencyDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={frequency || ''}
                onChange={handleInputChange(setFrequency)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={frequency || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Work Full-time Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('workFullTimeLabel')}</div>
            <div className="text-sm text-gray-500">{t('workFullTimeDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={workFullTime || ''}
                onChange={handleInputChange(setWorkFullTime)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={workFullTime || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Work B2B/UoD Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('workB2BLabel')}</div>
            <div className="text-sm text-gray-500">{t('workB2BDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={workB2B || ''}
                onChange={handleInputChange(setWorkB2B)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={workB2B || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Freelance Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('freelanceLabel')}</div>
            <div className="text-sm text-gray-500">{t('freelanceDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={freelance || ''}
                onChange={handleInputChange(setFreelance)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={freelance || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Medicines Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('medicinesLabel')}</div>
            <div className="text-sm text-gray-500">{t('medicinesDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={medicines || ''}
                onChange={handleInputChange(setMedicines)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={medicines || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Lost Pleasures Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-300"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('lostPleasuresLabel')}</div>
            <div className="text-sm text-gray-500">{t('lostPleasuresDesc')}</div>
            <div>
              <input
                type="number"
                min="0"
                value={lostPleasures || ''}
                onChange={handleInputChange(setLostPleasures)}
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="text"
                value={lostPleasures || ''}
                readOnly
                placeholder={t('placeholder')}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-600"
              />
            </div>
          </motion.div>

          {/* Cost 1 Day Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={resultVariants}
          >
            <div className="font-semibold text-gray-900 uppercase text-sm">{t('cost1DayLabel')}</div>
            <div className="text-sm text-gray-500">{t('cost1DayDesc')}</div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={costPerDay}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(costPerDay)}
            </motion.div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={`cost-${costPerDay}`}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(costPerDay)}
            </motion.div>
          </motion.div>

          {/* Monthly Cost Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={resultVariants}
          >
            <div className="font-semibold text-gray-900 uppercase text-sm">{t('monthlyCostLabel')}</div>
            <div className="text-sm text-gray-500">{t('monthlyCostDesc')}</div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={monthlyCost}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(monthlyCost)}
            </motion.div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={`monthly-${monthlyCost}`}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(monthlyCost)}
            </motion.div>
          </motion.div>

          {/* Annual Cost Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-300"
            variants={resultVariants}
          >
            <div className="font-semibold text-gray-900 uppercase text-sm">{t('annualCostLabel')}</div>
            <div className="text-sm text-gray-500">{t('annualCostDesc')}</div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={annualCost}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(annualCost)}
            </motion.div>
            <motion.div 
              className="font-semibold text-gray-900"
              key={`annual-${annualCost}`}
              initial={{ scale: 1.1, color: '#F79155' }}
              animate={{ scale: 1, color: '#111827' }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(annualCost)}
            </motion.div>
          </motion.div>

          {/* Investment Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-5 border-b border-gray-200"
            variants={rowVariants}
          >
            <div className="font-medium text-gray-900">{t('investmentLabel')}</div>
            <div className="text-sm text-gray-500">{t('investmentDesc')}</div>
            <div className="font-medium text-gray-900">{formatCurrency(investmentAmount)}</div>
            <div className="font-medium text-gray-900">{formatCurrency(investmentAmount)}</div>
          </motion.div>

          {/* Return Row */}
          <motion.div 
            className="grid grid-cols-4 gap-4 py-6"
            variants={resultVariants}
          >
            <div className="font-bold text-gray-900 uppercase text-sm">{t('returnLabel')}</div>
            <div className="text-sm text-gray-500">{t('returnDesc')}</div>
            <motion.div 
              className="font-bold text-2xl text-[#E8915A]"
              key={roi}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              {roi.toFixed(1)} {t('migraineDays')}
            </motion.div>
            <motion.div 
              className="font-bold text-2xl text-[#E8915A]"
              key={`roi-${roi}`}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              {roi.toFixed(1)} {t('migraineDays')}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

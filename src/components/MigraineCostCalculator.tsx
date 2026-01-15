'use client';

import { useState, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';

// Row variants for animations
const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export default function MigraineCostCalculator() {
  const t = useTranslations('calculator');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // SECTION 1: Base Data
  const [monthlyNetSalary, setMonthlyNetSalary] = useState<number>(5000);
  const [workDaysPerMonth, setWorkDaysPerMonth] = useState<number>(20);

  // SECTION 2: Extra Work
  const [extraWorkHourlyRate, setExtraWorkHourlyRate] = useState<number>(50);
  const [extraWorkHoursPerDay, setExtraWorkHoursPerDay] = useState<number>(4);
  const [lostMonthlyHours, setLostMonthlyHours] = useState<number>(0);

  // SECTION 3: Time & Work Costs
  const [migraineDaysPerMonth, setMigraineDaysPerMonth] = useState<number>(4);
  const [sickLeaveDays, setSickLeaveDays] = useState<number>(1);
  const [catchUpHours, setCatchUpHours] = useState<number>(0);

  // SECTION 4: Direct Expenses
  const [emergencyExpenses, setEmergencyExpenses] = useState<number>(100);
  const [foodDelivery, setFoodDelivery] = useState<number>(0);
  const [coffee, setCoffee] = useState<number>(0);
  const [taxi, setTaxi] = useState<number>(0);
  const [snacks, setSnacks] = useState<number>(0);
  const [acuteMedicationCost, setAcuteMedicationCost] = useState<number>(0);
  const [prophylacticMedicationCost, setProphylacticMedicationCost] = useState<number>(0);
  const [doctorVisitHours, setDoctorVisitHours] = useState<number>(2);
  const [travelTimeHours, setTravelTimeHours] = useState<number>(0);

  // SECTION 5: Emotional Costs
  const [lostOpportunitiesCost, setLostOpportunitiesCost] = useState<number>(0);
  const [affectedPeopleCount, setAffectedPeopleCount] = useState<number>(0);

  // CALCULATIONS
  const dailyRate = useMemo(() => {
    if (workDaysPerMonth === 0) return 0;
    return monthlyNetSalary / workDaysPerMonth;
  }, [monthlyNetSalary, workDaysPerMonth]);

  const hourlyRate = useMemo(() => {
    return dailyRate / 8;
  }, [dailyRate]);

  const sickLeaveIncomeLoss = useMemo(() => {
    return dailyRate * 0.2 * sickLeaveDays;
  }, [dailyRate, sickLeaveDays]);

  const extraWorkIncomeLoss = useMemo(() => {
    return extraWorkHourlyRate * lostMonthlyHours;
  }, [extraWorkHourlyRate, lostMonthlyHours]);

  const catchUpTimeCost = useMemo(() => {
    return catchUpHours * hourlyRate;
  }, [catchUpHours, hourlyRate]);

  const totalEmergencyExpenses = useMemo(() => {
    return emergencyExpenses + foodDelivery + coffee + taxi + snacks + acuteMedicationCost;
  }, [emergencyExpenses, foodDelivery, coffee, taxi, snacks, acuteMedicationCost]);

  const doctorTimeCost = useMemo(() => {
    return (doctorVisitHours + travelTimeHours) * hourlyRate;
  }, [doctorVisitHours, travelTimeHours, hourlyRate]);

  const totalMonthlyCost = useMemo(() => {
    // Note: Emotional costs (Section 5) are excluded from this total
    return sickLeaveIncomeLoss + extraWorkIncomeLoss + catchUpTimeCost +
      (totalEmergencyExpenses * migraineDaysPerMonth) + prophylacticMedicationCost +
      doctorTimeCost;
  }, [sickLeaveIncomeLoss, extraWorkIncomeLoss, catchUpTimeCost, totalEmergencyExpenses,
    migraineDaysPerMonth, prophylacticMedicationCost, doctorTimeCost]);

  const costPerMigraineDay = useMemo(() => {
    if (migraineDaysPerMonth === 0) return 0;
    return totalMonthlyCost / migraineDaysPerMonth;
  }, [totalMonthlyCost, migraineDaysPerMonth]);

  const glassesPrice = 450;
  const breakEvenDays = useMemo(() => {
    if (costPerMigraineDay === 0) return 0;
    return glassesPrice / costPerMigraineDay;
  }, [costPerMigraineDay]);

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setter(value);
  };

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-12 lg:py-20 lg:mx-20 bg-[#f5f3f0]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Title */}
        <motion.h2
          className="text-2xl lg:text-5xl font-bold text-left lg:text-center text-gray-900 mb-8 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        {/* Table */}
        <motion.div
          className="bg-[#f5f3f0] rounded-lg overflow-hidden"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header Row - Hidden on mobile */}
          <motion.div
            className="hidden lg:grid grid-cols-4 gap-4 px-4 py-4"
            variants={rowVariants}
          >
            <div className="text-sm font-semibold text-gray-700">{t('columnDescription')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnNotes')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnValue')}</div>
            <div className="text-sm font-semibold text-gray-700">{t('columnCost')}</div>
          </motion.div>

          <div className="px-4">
            {/* SECTION 1: BASE DATA */}
            <motion.div className=" px-4 py-3 mt-0 -mx-4" variants={sectionHeaderVariants}>
              <h3 className="font-bold text-[#F79155] uppercase text-sm tracking-wide">{t('section1Title')}</h3>
            </motion.div>

            {/* Monthly Net Salary */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('monthlyNetSalaryLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('monthlyNetSalaryDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={monthlyNetSalary || ''}
                  onChange={handleInputChange(setMonthlyNetSalary)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="hidden lg:block"></div>
            </motion.div>

            {/* Work Days Per Month */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('workDaysLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('workDaysDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={workDaysPerMonth || ''}
                  onChange={handleInputChange(setWorkDaysPerMonth)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-xs text-gray-400 flex items-center">({t('workDaysNote')})</div>
            </motion.div>

            {/* Daily Rate (calculated) */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('dailyRateLabel')}</div>
              <div></div>
              <div className="font-medium text-gray-700">{formatCurrency(dailyRate)}</div>
              <div className="text-xs text-gray-400 flex items-center">({t('autoCalculated')})</div>
            </motion.div>

            {/* Hourly Rate (calculated) */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('hourlyRateLabel')}</div>
              <div></div>
              <div className="font-medium text-gray-700">{formatCurrency(hourlyRate)}</div>
              <div className="text-xs text-gray-400 flex items-center">({t('autoCalculated')})</div>
            </motion.div>

            {/* SECTION 2: EXTRA WORK */}
            <motion.div className=" px-4 py-3 mt-6 -mx-4" variants={sectionHeaderVariants}>
              <h3 className="font-bold text-[#F79155] uppercase text-sm tracking-wide">{t('section2Title')}</h3>
            </motion.div>

            {/* Extra Work Hourly Rate */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('extraWorkRateLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('extraWorkRateDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={extraWorkHourlyRate || ''}
                  onChange={handleInputChange(setExtraWorkHourlyRate)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Extra Work Hours Per Day */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('extraWorkHoursLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('extraWorkHoursDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={extraWorkHoursPerDay || ''}
                  onChange={handleInputChange(setExtraWorkHoursPerDay)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Lost Monthly Hours */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('lostMonthlyHoursLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('lostMonthlyHoursDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={lostMonthlyHours || ''}
                  onChange={handleInputChange(setLostMonthlyHours)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* SECTION 3: TIME & WORK COSTS */}
            <motion.div className=" px-4 py-3 mt-6 -mx-4" variants={sectionHeaderVariants}>
              <h3 className="font-bold text-[#F79155] uppercase text-sm tracking-wide">{t('section3Title')}</h3>
            </motion.div>

            {/* Migraine Days Per Month */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('migraineDaysLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('migraineDaysDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={migraineDaysPerMonth || ''}
                  onChange={handleInputChange(setMigraineDaysPerMonth)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Sick Leave Days */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('sickLeaveDaysLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('sickLeaveDaysDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={sickLeaveDays || ''}
                  onChange={handleInputChange(setSickLeaveDays)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-sm text-gray-600">{formatCurrency(sickLeaveIncomeLoss)}</div>
            </motion.div>

            {/* Extra Work Income Loss (calculated) */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('extraWorkLossLabel')}</div>
              <div></div>
              <div className="font-medium text-gray-700">{formatCurrency(extraWorkIncomeLoss)}</div>
              <div className="text-xs text-gray-400 flex items-center">({t('extraWorkLossNote')})</div>
            </motion.div>

            {/* Catch Up Hours */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('catchUpHoursLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('catchUpHoursDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={catchUpHours || ''}
                  onChange={handleInputChange(setCatchUpHours)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-sm text-gray-600">{formatCurrency(catchUpTimeCost)}</div>
            </motion.div>

            {/* SECTION 4: DIRECT EXPENSES */}
            <motion.div className=" px-4 py-3 mt-6 -mx-4" variants={sectionHeaderVariants}>
              <h3 className="font-bold text-[#F79155] uppercase text-sm tracking-wide">{t('section4Title')}</h3>
            </motion.div>

            {/* Emergency Expenses */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('emergencyExpensesLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('emergencyExpensesDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={emergencyExpenses || ''}
                  onChange={handleInputChange(setEmergencyExpenses)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-sm text-gray-600">{formatCurrency(totalEmergencyExpenses)}</div>
            </motion.div>

            {/* Food Delivery */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('foodDeliveryLabel')}</div>
              <div></div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={foodDelivery || ''}
                  onChange={handleInputChange(setFoodDelivery)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Coffee */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('coffeeLabel')}</div>
              <div></div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={coffee || ''}
                  onChange={handleInputChange(setCoffee)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Taxi */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('taxiLabel')}</div>
              <div></div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={taxi || ''}
                  onChange={handleInputChange(setTaxi)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Snacks */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('snacksLabel')}</div>
              <div></div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={snacks || ''}
                  onChange={handleInputChange(setSnacks)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Acute Medication */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('acuteMedicationLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('acuteMedicationDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={acuteMedicationCost || ''}
                  onChange={handleInputChange(setAcuteMedicationCost)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Prophylactic Medication */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('prophylacticMedicationLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('prophylacticMedicationDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={prophylacticMedicationCost || ''}
                  onChange={handleInputChange(setProphylacticMedicationCost)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* Doctor Visit Hours */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('doctorVisitHoursLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('doctorVisitHoursDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={doctorVisitHours || ''}
                  onChange={handleInputChange(setDoctorVisitHours)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-sm text-gray-600">{formatCurrency(doctorTimeCost)}</div>
            </motion.div>

            {/* Travel Time Hours */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('travelTimeLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('travelTimeDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={travelTimeHours || ''}
                  onChange={handleInputChange(setTravelTimeHours)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div></div>
            </motion.div>

            {/* SECTION 5: EMOTIONAL COSTS */}
            <motion.div className=" px-4 py-3 mt-6 -mx-4" variants={sectionHeaderVariants}>
              <h3 className="font-bold text-[#F79155] uppercase text-sm tracking-wide">{t('section5Title')}</h3>
            </motion.div>

            {/* Lost Opportunities */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('lostOpportunitiesLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('lostOpportunitiesDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={lostOpportunitiesCost || ''}
                  onChange={handleInputChange(setLostOpportunitiesCost)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-sm text-gray-600">{formatCurrency(lostOpportunitiesCost)}</div>
            </motion.div>

            {/* Affected People Count */}
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 py-3 lg:py-4  " variants={rowVariants}>
              <div className="font-medium text-gray-900 text-xs lg:text-sm">{t('affectedPeopleLabel')}</div>
              <div className="hidden lg:block text-sm text-gray-500">{t('affectedPeopleDesc')}</div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={affectedPeopleCount || ''}
                  onChange={handleInputChange(setAffectedPeopleCount)}
                  placeholder={t('placeholder')}
                  className="w-full px-2 lg:px-3 py-2 bg-white  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs lg:text-sm text-gray-600 transition-all duration-200"
                />
              </div>
              <div className="text-xs text-gray-400 flex items-center">({t('infoOnly')})</div>
            </motion.div>

            {/*  add a divider */}
            <div className="h-px bg-black my-6"></div>

            {/* MONTHLY SUMMARY - New Design */}
            <motion.div
              className="-mx-4 mt-8 bg-[#f5f3f0] py-10 lg:py-6 px-6 text-center"
              variants={sectionHeaderVariants}
            >
              {/* Title */}
              <h3 className="font-bold text-gray-900 uppercase text-[42px] tracking-wide mb-6">
                {t('summaryTitle')}
              </h3>

              {/* Monthly Cost Line */}
              <p className="text-gray-800 text-[42px] mb-3">
                {t('monthlyCostText')}{' '}
                <motion.span
                  className="text-orange-500 font-bold text-[42px]"
                  key={totalMonthlyCost}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(totalMonthlyCost)} PLN
                </motion.span>
              </p>

              {/* Glasses Cost Line */}
              <p className="text-gray-500 text-xs lg:text-sm mb-6">
                {t('glassesCostText')}{' '}
                <span className="font-semibold text-gray-700">{glassesPrice} PLN</span>
              </p>

              {/* ROI Line */}
              <p className="text-gray-800 text-[42px]">
                {t('roiText')}{' '}
                <motion.span
                  className="text-gray-900 font-bold text-[42px]"
                  key={breakEvenDays}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(breakEvenDays)} {t('days')}
                </motion.span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

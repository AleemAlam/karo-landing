'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';

// --- Reusable Components ---

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  color?: string;
}

const SectionHeader = ({ title, isOpen, onToggle, color = '#F79155' }: SectionHeaderProps) => (
  <motion.div
    className="px-4 py-1 -mx-4 cursor-pointer flex items-center justify-between hover:bg-gray-100/50 transition-colors"
    variants={{
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    }}
    onClick={onToggle}
  >
    <h3 className="font-bold uppercase tracking-wide text-[20px]" style={{ color }}>{title}</h3>
    <svg
      className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      style={{ color }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </motion.div>
);

interface CalculatorRowProps {
  label: string;
  description?: string;
  value?: number;
  onChange?: (val: number) => void;
  placeholder?: string;
  displayValue?: string; // Can be cost, calculated rate, etc.
  note?: string;
}

const CalculatorRow = ({
  label,
  description,
  value,
  onChange,
  placeholder,
  displayValue,
  note
}: CalculatorRowProps) => {
  return (
    <div className="hidden lg:grid grid-cols-4 gap-4 py-1 h-[50px] items-center">
      <div className="font-medium text-gray-900 text-[16px]">{label}</div>
      <div className="text-gray-500 text-[16px]">{description}</div>

      {/* Column 3: Input or Primary Display Value */}
      <div>
        {onChange ? (
          <input
            type="number"
            min="0"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-600 transition-all duration-200"
          />
        ) : (
          <div className="font-medium text-gray-700">{displayValue}</div>
        )}
      </div>

      {/* Column 4: Secondary Display (Cost) or Note */}
      <div>
        {onChange && displayValue && <div className="text-sm text-gray-600">{displayValue}</div>}
        {note && <div className="text-[16px] text-gray-400 flex items-center">({note})</div>}
      </div>
    </div>
  );
};

// Mobile-specific row component
const CalculatorRowMobile = ({
  label,
  value,
  onChange,
  placeholder,
  displayValue,
  note
}: CalculatorRowProps) => {
  return (
    <div className="lg:hidden flex flex-col py-3 border-b border-gray-200/50">
      {/* Label */}
      <div className="font-medium text-gray-900 text-sm mb-2">{label}</div>

      {/* Input or Display */}
      <div className="flex items-center justify-between gap-4">
        {onChange ? (
          <input
            type="number"
            min="0"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-700 transition-all duration-200"
          />
        ) : (
          <div className="flex-1 px-3 py-2.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
            {displayValue}
          </div>
        )}

        {/* Cost display or note for mobile */}
        {onChange && displayValue && (
          <div className="text-sm font-medium text-orange-500 min-w-[80px] text-right">{displayValue}</div>
        )}
        {note && !onChange && (
          <div className="text-xs text-gray-400 italic">({note})</div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---

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

export default function MigraineCostCalculator() {
  const t = useTranslations('calculator');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Accordion states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
  const [doctorVisitCost, setDoctorVisitCost] = useState<number>(200);
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
    return (doctorVisitHours + travelTimeHours) * doctorVisitCost;
  }, [doctorVisitCost, doctorVisitHours, travelTimeHours, hourlyRate]);

  const totalMonthlyCost = useMemo(() => {
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

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
  };

  interface Section {
    id: string;
    title: string;
    rows: CalculatorRowProps[];
  }

  const sections: Section[] = [
    {
      id: 'section1',
      title: t('section1Title'),
      rows: [
        {
          label: t('monthlyNetSalaryLabel'),
          description: t('monthlyNetSalaryDesc'),
          value: monthlyNetSalary,
          onChange: setMonthlyNetSalary,
        },
        {
          label: t('workDaysLabel'),
          description: t('workDaysDesc'),
          value: workDaysPerMonth,
          onChange: setWorkDaysPerMonth,
          note: t('workDaysNote'),
        },
        {
          label: t('dailyRateLabel'),
          displayValue: formatCurrency(dailyRate),
          note: t('autoCalculated'),
        },
        {
          label: t('hourlyRateLabel'),
          displayValue: formatCurrency(hourlyRate),
          note: t('autoCalculated'),
        },
      ],
    },
    {
      id: 'section2',
      title: t('section2Title'),
      rows: [
        {
          label: t('extraWorkRateLabel'),
          description: t('extraWorkRateDesc'),
          value: extraWorkHourlyRate,
          onChange: setExtraWorkHourlyRate,
        },
        {
          label: t('extraWorkHoursLabel'),
          description: t('extraWorkHoursDesc'),
          value: extraWorkHoursPerDay,
          onChange: setExtraWorkHoursPerDay,
        },
        {
          label: t('lostMonthlyHoursLabel'),
          description: t('lostMonthlyHoursDesc'),
          value: lostMonthlyHours,
          onChange: setLostMonthlyHours,
        },
      ],
    },
    {
      id: 'section3',
      title: t('section3Title'),
      rows: [
        {
          label: t('migraineDaysLabel'),
          description: t('migraineDaysDesc'),
          value: migraineDaysPerMonth,
          onChange: setMigraineDaysPerMonth,
        },
        {
          label: t('sickLeaveDaysLabel'),
          description: t('sickLeaveDaysDesc'),
          value: sickLeaveDays,
          onChange: setSickLeaveDays,
          displayValue: formatCurrency(sickLeaveIncomeLoss),
        },
        {
          label: t('extraWorkLossLabel'),
          displayValue: formatCurrency(extraWorkIncomeLoss),
          note: t('extraWorkLossNote'),
        },
        {
          label: t('catchUpHoursLabel'),
          description: t('catchUpHoursDesc'),
          value: catchUpHours,
          onChange: setCatchUpHours,
          displayValue: formatCurrency(catchUpTimeCost),
        },
      ],
    },
    {
      id: 'section4',
      title: t('section4Title'),
      rows: [
        {
          label: t('emergencyExpensesLabel'),
          description: t('emergencyExpensesDesc'),
          value: emergencyExpenses,
          onChange: setEmergencyExpenses,
          displayValue: formatCurrency(totalEmergencyExpenses),
        },
        {
          label: t('foodDeliveryLabel'),
          value: foodDelivery,
          onChange: setFoodDelivery,
        },
        {
          label: t('coffeeLabel'),
          value: coffee,
          onChange: setCoffee,
        },
        {
          label: t('taxiLabel'),
          value: taxi,
          onChange: setTaxi,
        },
        {
          label: t('snacksLabel'),
          value: snacks,
          onChange: setSnacks,
        },
        {
          label: t('acuteMedicationLabel'),
          description: t('acuteMedicationDesc'),
          value: acuteMedicationCost,
          onChange: setAcuteMedicationCost,
        },
        {
          label: t('prophylacticMedicationLabel'),
          description: t('prophylacticMedicationDesc'),
          value: prophylacticMedicationCost,
          onChange: setProphylacticMedicationCost,
        },
        {
          label: t('doctorVisitCostLabel'),
          description: t('doctorVisitCostDesc'),
          value: doctorVisitCost,
          onChange: setDoctorVisitCost,
        },
        {
          label: t('doctorVisitHoursLabel'),
          description: t('doctorVisitHoursDesc'),
          value: doctorVisitHours,
          onChange: setDoctorVisitHours,
          displayValue: formatCurrency(doctorTimeCost),
        },
        {
          label: t('travelTimeLabel'),
          description: t('travelTimeDesc'),
          value: travelTimeHours,
          onChange: setTravelTimeHours,
        },
      ],
    },
    {
      id: 'section5',
      title: t('section5Title'),
      rows: [
        {
          label: t('lostOpportunitiesLabel'),
          description: t('lostOpportunitiesDesc'),
          value: lostOpportunitiesCost,
          onChange: setLostOpportunitiesCost,
          displayValue: formatCurrency(lostOpportunitiesCost),
        },
        {
          label: t('affectedPeopleLabel'),
          description: t('affectedPeopleDesc'),
          value: affectedPeopleCount,
          onChange: setAffectedPeopleCount,
          note: t('infoOnly'),
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-[#f5f3f0] font-sans lg:mx-20" ref={ref}>
      <div className="max-w-[1480px] mx-auto px-4 lg:px-6">
        {/* Title */}
        <motion.h2
          className="text-2xl lg:text-5xl font-bold text-left lg:text-center text-gray-900 mb-4 lg:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-[20px] font-light text-gray-700 text-left mb-4 lg:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('description')}
        </motion.p>

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
            <div className="text-sm font-semibold text-gray-700 text-[24px]">{t('columnDescription')}</div>
            <div className="text-sm font-semibold text-gray-700 text-[24px]">{t('columnNotes')}</div>
            <div className="text-sm font-semibold text-gray-700 text-[24px]">{t('columnValue')}</div>
            <div className="text-sm font-semibold text-gray-700 text-[24px]">{t('columnCost')}</div>
          </motion.div>

          <div className="px-4">
            {sections.map((section) => (
              <div key={section.id} className='my-6'>
                <SectionHeader
                  title={section.title}
                  isOpen={openSections[section.id]}
                  onToggle={() => toggleSection(section.id)}
                />

                {openSections[section.id] && (
                  <>
                    {section.rows.map((row, index) => (
                      <React.Fragment key={index}>
                        {/* Desktop Row */}
                        <CalculatorRow
                          label={row.label}
                          description={row.description}
                          value={row.value}
                          onChange={row.onChange}
                          placeholder={t('placeholder')}
                          displayValue={row.displayValue}
                          note={row.note}
                        />
                        {/* Mobile Row */}
                        <CalculatorRowMobile
                          label={row.label}
                          description={row.description}
                          value={row.value}
                          onChange={row.onChange}
                          placeholder={t('placeholder')}
                          displayValue={row.displayValue}
                          note={row.note}
                        />
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            ))}

            {/*  add a divider */}
            <div className="h-px bg-black my-6"></div>

            {/* MONTHLY SUMMARY - Desktop */}
            <motion.div
              className="hidden lg:block -mx-4 mt-8 bg-[#f5f3f0] py-6 px-6 text-center"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
              }}
            >
              {/* Title */}
              <h3 className="font-bold text-gray-900 uppercase text-[42px] tracking-wide mb-3">
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
              <p className="text-gray-600 font-bold text-[24px] mb-3">
                {t('glassesCostText')}{' '}
                <span className="font-bolder text-gray-900 text-[28px]">{glassesPrice} PLN</span>
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

            {/* MONTHLY SUMMARY - Mobile */}
            <div className="lg:hidden -mx-4 mt-6 bg-linear-to-b from-orange-50 to-white py-8 px-4 text-center rounded-t-3xl">
              {/* Title */}
              <h3 className="font-bold text-gray-900 uppercase text-xl tracking-wide mb-4">
                {t('summaryTitle')}
              </h3>

              {/* Monthly Cost Card */}
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
                <p className="text-gray-600 text-sm mb-1">{t('monthlyCostText')}</p>
                <motion.p
                  className="text-orange-500 font-bold text-3xl"
                  key={totalMonthlyCost}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(totalMonthlyCost)} PLN
                </motion.p>
              </div>

              {/* Glasses Cost */}
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <p className="text-gray-600 text-sm">{t('glassesCostText')}</p>
                <p className="font-bold text-gray-900 text-xl">{glassesPrice} PLN</p>
              </div>

              {/* ROI */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <p className="text-gray-600 text-sm mb-1">{t('roiText')}</p>
                <motion.p
                  className="text-gray-900 font-bold text-2xl"
                  key={breakEvenDays}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round(breakEvenDays)} {t('days')}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

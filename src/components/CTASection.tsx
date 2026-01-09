'use client';

import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="bg-[#2B183D] py-12 lg:py-20 mx-16 -mt-8 lg:-mt-120 z-10 relative">
      <div className="px-4 lg:px-42 mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-[45px] font-bold text-white mb-4 lg:mb-6 leading-tight">
          {t('heading')} <span className="text-orange-500">{t('headingHighlight')}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm lg:text-[15px] mx-auto mb-4 lg:mb-6 leading-relaxed whitespace-pre-line">
          {t('description')}
        </p>

        {/* Guarantee Text */}
        <p className="text-white font-semibold text-sm lg:text-[16px] mb-6 lg:mb-8">
          {t('guarantee')}
        </p>

        {/* CTA Button */}
        <button className="w-full lg:w-auto bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-6 lg:px-8 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer text-sm lg:text-base">
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
      </div>
    </section>
  );
}

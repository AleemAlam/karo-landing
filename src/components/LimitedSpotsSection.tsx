'use client';

import { useTranslations } from 'next-intl';

export default function LimitedSpotsSection() {
  const t = useTranslations('limitedSpots');

  const points = [
    t('point1'),
    t('point2'),
    t('point3'),
  ];

  return (
    <section className="pb-8 lg:pb-16 bg-[#F3F3EF] mx-20">
      <div className="px-4 lg:px-20 text-center lg:mx-20 bg-[#2B183D] py-10 lg:py-20">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 lg:mb-8 px-2">
          {t('heading')}
        </h2>

        {/* Points - Stacked on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mb-8 lg:mb-10">
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 text-xs lg:text-sm">{point}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full lg:w-auto bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-6 lg:px-10 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer text-sm lg:text-base">
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

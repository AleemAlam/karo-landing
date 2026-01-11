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
    <>
      {/* Mobile Layout */}
      <section className="lg:hidden bg-[#F3F3EF] pb-8">
        <div className="bg-[#2B183D] py-10 px-6">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t('heading')}
          </h2>

          {/* Points - Left aligned */}
          <div className="flex flex-col items-start gap-4 mb-8">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white text-base">{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
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
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden lg:block pb-16 bg-[#F3F3EF] mx-20">
        <div className="px-20 text-center mx-20 bg-[#2B183D] py-20">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-white mb-8 px-2">
            {t('heading')}
          </h2>

          {/* Points - Row on desktop */}
          <div className="flex flex-row items-center justify-center gap-8 mb-10">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-10 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer text-base">
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
    </>
  );
}

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
    <section className="pb-16 bg-[#F3F3EF] mx-40">
      <div className="px-20 text-center mx-20 bg-[#2B183D] py-20">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-8">
          {t('heading')}
        </h2>
        
        {/* Points */}
        <div className="flex items-center justify-center gap-8 mb-10">
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
        <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-10 py-4 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer">
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

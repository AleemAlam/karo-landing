'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function CreatorSection() {
  const t = useTranslations('creator');

  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="px-40 mx-auto">
        <div className="flex items-center gap-16">
          {/* Left Image */}
          <div className="flex-1 relative">
            <Image
              src="/frame-26.png"
              alt="Program creator"
              width={1374}
              height={1374}
              className="object-contain scale-150"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-6">
            {/* Book Icon */}
            <Image
              src="/Open-book.png"
              alt="Book Icon"
              width={64}
              height={64}
              className="object-contain"
            />

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              {t('heading')} <br/><span className="text-orange-500">{t('headingHighlight')}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl font-semibold text-black">
              {t('subtitle')}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {t('description')}
            </p>

            {/* CTA Button */}
            <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-8 py-4 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer">
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
        </div>
      </div>
    </section>
  );
}

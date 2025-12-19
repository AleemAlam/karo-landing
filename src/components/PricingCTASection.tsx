'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function PricingCTASection() {
  const t = useTranslations('pricingCTA');
  const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 27 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-[#F3F3EF] mx-40">
      <div className="mx-20">
        {/* Orange Border Card */}
        <div className="border-8 border-orange-500 bg-[#F3F3EF] py-12 px-16">
          <div className="text-center">
            {/* Top Text */}
            <p className="text-black text-5xl font-extrabold mb-2">{t('topText')}</p>
            
            {/* Main Heading - Orange Italic */}
            <h2 className="text-4xl lg:text-7xl font-extrabold text-orange-500 italic mb-4">
              {t('heading')}
            </h2>
            
            {/* Subtext */}
            <p className="text-black text-5xl font-extrabold whitespace-pre-line mb-8">
              {t('subText')}
            </p>

            {/* Price Comparison */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-gray-600">
                <span>{t('totalValueLabel')}</span>
                <span className="line-through ml-2">{t('totalValueAmount')}</span>
              </div>
              <span className="text-gray-400">/</span>
              <div className="text-gray-600">
                <span>{t('regularPriceLabel')}</span>
                <span className="line-through ml-2">{t('regularPriceAmount')}</span>
              </div>
            </div>

            {/* Today's Price */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                <g clip-path="url(#clip0_346_657)">
                  <path d="M45.7416 25.1348C45.5445 24.7314 45.5445 24.2688 45.7416 23.8655L47.5692 20.1269C48.5867 18.0453 47.7805 15.5642 45.7338 14.4783L42.0578 12.5278C41.6613 12.3175 41.3894 11.9431 41.3117 11.501L40.5928 7.4022C40.1925 5.12008 38.0815 3.58654 35.7878 3.91107L31.6675 4.49389C31.2228 4.55667 30.783 4.41369 30.4604 4.10161L27.4696 1.20833C25.8043 -0.402728 23.1954 -0.402824 21.5302 1.20833L18.5393 4.1019C18.2166 4.41408 17.7769 4.55677 17.3322 4.49418L13.2119 3.91135C10.9175 3.58663 8.80724 5.12036 8.40691 7.40249L7.688 11.5011C7.61038 11.9433 7.33849 12.3176 6.942 12.528L3.26606 14.4784C1.21937 15.5643 0.413168 18.0456 1.43068 20.1272L3.25812 23.8657C3.45527 24.2691 3.45527 24.7317 3.25812 25.135L1.43058 28.8735C0.413072 30.9552 1.21927 33.4363 3.26597 34.5222L6.9419 36.4726C7.33849 36.683 7.61038 37.0574 7.688 37.4994L8.40691 41.5983C8.77135 43.6758 10.5528 45.1327 12.6001 45.1325C12.8018 45.1325 13.0064 45.1184 13.212 45.0893L17.3323 44.5065C17.7767 44.4434 18.2167 44.5867 18.5394 44.8988L21.5302 47.792C22.363 48.5977 23.4313 49.0004 24.4999 49.0003C25.5682 49.0002 26.6371 48.5975 27.4695 47.792L30.4604 44.8988C30.7831 44.5867 31.223 44.4441 31.6675 44.5065L35.7878 45.0893C38.0826 45.4139 40.1925 43.8803 40.5928 41.5982L41.3118 37.4995C41.3895 37.0574 41.6613 36.6831 42.0578 36.4726L45.7338 34.5222C47.7805 33.4364 48.5867 30.9551 47.5692 28.8735L45.7416 25.1348ZM18.8476 11.7827C21.7045 11.7827 24.0288 14.107 24.0288 16.9639C24.0288 19.8209 21.7045 22.1452 18.8476 22.1452C15.9907 22.1452 13.6663 19.8209 13.6663 16.9639C13.6663 14.107 15.9907 11.7827 18.8476 11.7827ZM16.1733 34.825C15.8974 35.1009 15.5357 35.2389 15.1741 35.2389C14.8126 35.2389 14.4508 35.101 14.175 34.825C13.6232 34.2732 13.6232 33.3785 14.175 32.8266L32.8264 14.1753C33.3781 13.6234 34.2729 13.6234 34.8247 14.1753C35.3766 14.7271 35.3766 15.6218 34.8247 16.1736L16.1733 34.825ZM30.152 37.2178C27.2951 37.2178 24.9707 34.8934 24.9707 32.0365C24.9707 29.1796 27.2951 26.8553 30.152 26.8553C33.0089 26.8553 35.3332 29.1796 35.3332 32.0365C35.3332 34.8934 33.0089 37.2178 30.152 37.2178Z" fill="#F79155"/>
                  <path d="M30.152 29.6812C28.8534 29.6812 27.7969 30.7376 27.7969 32.0362C27.7969 33.3348 28.8533 34.3912 30.152 34.3912C31.4506 34.3912 32.5071 33.3348 32.5071 32.0362C32.5071 30.7376 31.4506 29.6812 30.152 29.6812Z" fill="#F79155"/>
                  <path d="M18.8482 14.6084C17.5496 14.6084 16.4932 15.6649 16.4932 16.9634C16.4932 18.262 17.5496 19.3186 18.8482 19.3186C20.1468 19.3186 21.2034 18.2621 21.2034 16.9634C21.2033 15.665 20.1468 14.6084 18.8482 14.6084Z" fill="#F79155"/>
                </g>
                <defs>
                  <clipPath id="clip0_346_657">
                    <rect width="49" height="49" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="text-black text-5xl font-semibold">{t('todayPriceLabel')}</span>
              <span className="text-orange-500 text-5xl font-bold">{t('todayPriceAmount')}</span>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-[#2C3A3A]">{t('countdownLabel')}</span>
              <span className="text-black text-4xl font-bold">
                {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </span>
              <span className="text-[#2C3A3A]">{t('countdownUnit')}</span>
            </div>

            {/* CTA Button */}
            <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-10 py-4 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer mb-6">
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

            {/* Disclaimer */}
            <p className="text-gray-500 text-sm">{t('disclaimer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


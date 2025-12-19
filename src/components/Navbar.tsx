'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('navbar');
  const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 27 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <header className="w-full">
      {/* Orange accent line at the top */}
      <div className="h-2 bg-linear-to-r from-orange-400 to-orange-500" />
      
      {/* Main navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="px-40 mx-auto py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/fovia-logo.png"
                alt="Fovea Blue"
                width={140}
                height={40}
                priority
              />
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                {t('promotionEnds')}
              </span>
              <div className="flex items-center bg-gray-50 px-4 py-2">
                <span className="text-2xl font-bold text-gray-800 tabular-nums">
                  {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </div>
              <span className="text-gray-500 text-sm ml-2">{t('minutes')}</span>
            </div>

            {/* CTA Button */}
            <button className="bg-[#F79155] hover:bg-orange-500 text-white font-semibold px-6 py-2.5 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer">
              {t('joinButton')}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

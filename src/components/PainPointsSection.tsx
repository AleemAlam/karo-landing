'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PainPointsSection() {
  const t = useTranslations('painPoints');

  const frustrationPoints = [
    t('point1'),
    t('point2'),
    t('point3'),
    t('point4'),
  ];

  const goodNewsPoints = [
    t('goodNews1'),
    t('goodNews2'),
    t('goodNews3'),
  ];

  return (
    <section className="bg-white overflow-hidden">
      <div className="px-40 mx-auto">
        {/* First Row - Image Left, Content Right */}
        <div className="flex items-center gap-24">
          {/* Left Image */}
          <div className="flex-1">
            <Image
              src="/frame-24.png"
              alt="Woman with headache"
              width={755}
              height={650}
              className="object-contain scale-130 ml-20 mt-20"
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-5 pt-12">
            <h2 className="text-5xl font-extrabold leading-tight text-black lg:w-[90%]">
              {t('heading1')} <span className="text-orange-500">{t('heading1Highlight')}</span>
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed">
              {t('intro')}
            </p>

            <div>
              <p className="text-gray-700 text-[15px] mb-0.5">{t('guessWhat')}</p>
              <ul className="space-y-1">
                {frustrationPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#565656] text-[15px] mb-0">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-800 font-semibold text-[15px]">{t('stillHurts')}</p>
          </div>
        </div>

        {/* Second Row - Content Left, Image Right */}
        <div className="flex items-end justify-baseline -mt-32">
          {/* Left Content */}
          <div className="flex-1 space-y-5 relative -top-[550px]">
            <h2 className="text-5xl font-bold leading-tight min-w-[850px]">
              <span className="text-black">{t('heading2Line1')}</span>
              <br />
              <span className="text-orange-500">{t('heading2Line2')}</span>
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[670px]">
              {t('description2')}
            </p>

            <div>
              <p className="text-gray-800 font-semibold text-[15px] mb-0.5">{t('goodNewsTitle')}</p>
              <ul className="space-y-1">
                {goodNewsPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#565656] text-[15px] mb-0">
                    <span className="text-gray-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="shrink-0 relative -top-[80px] right-[450px]">
            <Image
              src="/frame-25.png"
              alt="Woman frustrated with headache"
              width={1300}
              height={380}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


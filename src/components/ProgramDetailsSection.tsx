'use client';

import { useTranslations } from 'next-intl';

export default function ProgramDetailsSection() {
  const t = useTranslations('programDetails');

  const modules = [
    { number: '01', title: t('module1Title'), description: t('module1Desc'), value: '600 zł' },
    { number: '02', title: t('module2Title'), description: t('module2Desc'), value: '400 zł' },
    { number: '03', title: t('module3Title'), description: t('module3Desc'), value: '500 zł' },
    { number: '04', title: t('module4Title'), description: t('module4Desc'), value: '600 zł' },
    { number: '05', title: t('module5Title'), description: t('module5Desc'), value: '300 zł' },
    { number: '06', title: t('module6Title'), description: t('module6Desc'), value: '400 zł' },
    { number: '07', title: t('module7Title'), description: t('module7Desc'), value: '250 zł' },
  ];

  const community = [
    { title: t('community1Title'), description: t('community1Desc'), value: '300 zł' },
    { title: t('community2Title'), description: t('community2Desc'), value: '299 zł' },
    { title: t('community3Title'), description: t('community3Desc'), value: '200 zł' },
  ];

  const coaching = [
    { title: t('coaching1Title'), description: t('coaching1Desc'), value: '600 zł' },
  ];

  const tools = [
    { title: t('tools1Title'), description: t('tools1Desc'), value: '500 zł' },
    { title: t('tools2Title'), description: t('tools2Desc'), value: '200 zł' },
  ];

  return (
    <section className="py-20 bg-[#F3F3EF] mx-40">
      <div className="px-20 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            {t('heading')} <span className="text-orange-500">{t('headingHighlight')}</span> {t('headingEnd')}
          </h2>
        </div>

        {/* Modules Section */}
        <div className="mb-5 bg-white px-8 py-6">
          <h3 className="text-2xl font-bold text-black mb-6">{t('modulesTitle')}</h3>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-12 py-3 text-sm text-black font-bold border-b border-gray-200">
              <div className="col-span-3">{t('labelModule')}</div>
              <div className="col-span-7">{t('labelDescription')}</div>
              <div className="col-span-2 text-right text-black font-bold">{t('labelValue')}</div>
            </div>
            {modules.map((module, index) => (
              <div key={index} className={`grid grid-cols-12 py-4 border-b border-gray-200 items-start ${index === modules.length - 1 ? 'border-b-0' : ''}`}>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#565656] text-sm">{module.title}</span>
                </div>
                <div className="col-span-7 text-[#565656] text-sm">{module.description}</div>
                <div className="col-span-2 text-right text-black font-bold">{module.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="mb-5 px-8 py-6 bg-white">
          <h3 className="text-2xl font-bold text-black mb-6">{t('communityTitle')}</h3>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-12 py-3 text-sm text-black  font-bold border-b border-gray-200">
              <div className="col-span-3">{t('labelElement')}</div>
              <div className="col-span-7">{t('labelDescription')}</div>
              <div className="col-span-2 text-right text-black font-bold">{t('labelValue')}</div>
            </div>
            {community.map((item, index) => (
              <div key={index} className={`grid grid-cols-12 py-4 border-b border-gray-200 items-start ${index === community.length - 1 ? 'border-b-0' : ''}`}>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#565656] text-sm">{item.title}</span>
                </div>
                <div className="col-span-7 text-[#565656] text-sm">{item.description}</div>
                <div className="col-span-2 text-right font-bold text-black">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Section */}
        <div className="mb-5 px-8 py-6 bg-white">
          <h3 className="text-2xl font-bold text-black mb-6">{t('coachingTitle')}</h3>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-12 py-3 text-sm  text-black font-bold border-b border-gray-200">
              <div className="col-span-3">{t('labelElement')}</div>
              <div className="col-span-7">{t('labelDescription')}</div>
              <div className="col-span-2 text-right text-black font-bold">{t('labelValue')}</div>
            </div>
            {coaching.map((item, index) => (
              <div key={index} className={`grid grid-cols-12 py-4 border-b border-gray-200 items-start ${index === coaching.length - 1 ? 'border-b-0' : ''}`}>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#565656] text-sm">{item.title}</span>
                </div>
                <div className="col-span-7 text-[#565656] text-sm">{item.description}</div>
                <div className="col-span-2 text-right text-black font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-5 px-8 py-6 bg-white">
          <h3 className="text-2xl font-bold text-black mb-6">{t('toolsTitle')}</h3>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-12 py-3 text-sm text-black font-bold border-b border-gray-200">
              <div className="col-span-3">{t('labelElement')}</div>
              <div className="col-span-7">{t('labelDescription')}</div>
              <div className="col-span-2 text-right text-black font-bold">{t('labelValue')}</div>
            </div>
            {tools.map((item, index) => (
              <div key={index} className={`grid grid-cols-12 py-4 border-b border-gray-200 items-start ${index === tools.length - 1 ? 'border-b-0' : ''}`}>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#565656] text-sm">{item.title}</span>
                </div>
                <div className="col-span-7 text-[#565656] text-sm">{item.description}</div>
                <div className="col-span-2 text-right text-black font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-6 px-8 bg-white">
          <h3 className="text-2xl font-bold text-black">{t('totalLabel')}</h3>
          <span className="text-3xl font-bold text-orange-500">{t('totalValue')}</span>
        </div>
      </div>
    </section>
  );
}

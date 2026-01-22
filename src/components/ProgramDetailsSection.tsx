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

  // Mobile card component for items
  const MobileCard = ({ title, description, value }: { title: string; description: string; value: string }) => (
    <div className="bg-white p-4 border-b border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-800 text-sm">{title}</span>
            <span className="text-orange-500 font-bold text-sm shrink-0 ml-2">{value}</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Layout */}
      <section className="lg:hidden py-12 bg-[#F3F3EF]">
        <div className="px-4">
          {/* Section Header */}
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold text-black leading-tight">
              {t('heading')} <span className="text-orange-500">{t('headingHighlight')}</span> {t('headingEnd')}
            </h2>
          </div>

          {/* Modules Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold text-black mb-4">{t('modulesTitle')}</h3>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className={`pb-4 ${index !== modules.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-800 text-">{module.title}</span>
                        <span className="text-orange-500 font-bold text-sm ml-2 shrink-0">{module.value}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold text-black mb-4">{t('communityTitle')}</h3>
            <div className="space-y-4">
              {community.map((item, index) => (
                <div key={index} className={`pb-4 ${index !== community.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-800 text-sm">{item.title}</span>
                        <span className="text-orange-500 font-bold text-sm ml-2 shrink-0">{item.value}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Section */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold text-black mb-4">{t('coachingTitle')}</h3>
            <div className="space-y-4">
              {coaching.map((item, index) => (
                <div key={index} className={`pb-4 ${index !== coaching.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-800 text-sm">{item.title}</span>
                        <span className="text-orange-500 font-bold text-sm ml-2 shrink-0">{item.value}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Total */}
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <div className="flex justify-center items-center gap-4">
              <h3 className="text-2xl font-bold text-black">{t('totalLabel')}</h3>
              <span className="text-2xl font-bold text-black">=</span>
              <span className="text-2xl font-bold text-orange-500">{t('totalValue')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden lg:block py-20 bg-[#F3F3EF] mx-20">
        <div className="px-20 mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold text-black">
              {t('heading')} <span className="text-orange-500">{t('headingHighlight')}</span> {t('headingEnd')}
            </h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
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
                <div className="grid grid-cols-12 py-3 text-sm text-black font-bold border-b border-gray-200">
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
                <div className="grid grid-cols-12 py-3 text-sm text-black font-bold border-b border-gray-200">
                  <div className="col-span-3">{t('labelElement')}</div>
                  <div className="col-span-7">{t('labelDescription')}</div>
                  <div className="col-span-2 text-right text-black font-bold">{t('labelValue')}</div>
                </div>
                {coaching.map((item, index) => (
                  <div key={index} className={`grid grid-cols-12 py-4 border-b border-gray-200 items-start ${index === coaching.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
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
        </div>
      </section>
    </>
  );
}

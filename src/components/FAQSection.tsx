'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setOpenIndex(null);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="px-4 lg:px-20 mx-auto">
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden">
          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight mb-2">
              {t('title1')} {t('title2')}
            </h2>
            <p className="text-gray-500 text-sm">{t('subtitle')}</p>
          </div>

          {/* Accordion */}
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full py-4 flex items-start justify-between text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 text-lg font-bold shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                    <span className="text-black font-medium text-sm">{faq.question}</span>
                  </div>
                </button>

                {/* Answer */}
                {(openIndex === index || showAll) && (
                  <div className="pb-4 pl-8 pr-2">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Show All Link */}
            <button
              onClick={toggleShowAll}
              className="mt-4 text-orange-500 font-medium flex items-center gap-2 cursor-pointer hover:text-orange-600 transition-colors text-sm"
            >
              {showAll ? t('collapseAll') : t('expandAll')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${showAll ? 'rotate-90' : ''}`}
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

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex gap-20">
          {/* Left Side - Title */}
          <div className="w-1/3">
            <h2 className="text-4xl font-bold text-black leading-tight mb-2">
              {t('title1')}
              <br />
              {t('title2')}
            </h2>
            <p className="text-gray-500 text-sm">{t('subtitle')}</p>
          </div>

          {/* Right Side - Accordion */}
          <div className="w-2/3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full py-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-orange-500 text-xl font-bold">
                      {openIndex === index ? '−' : '+'}
                    </span>
                    <span className="text-black font-medium">{faq.question}</span>
                  </div>
                </button>

                {/* Answer */}
                {(openIndex === index || showAll) && (
                  <div className="pb-5 pl-10 pr-4">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Show All Link */}
            <button
              onClick={toggleShowAll}
              className="mt-6 text-orange-500 font-medium flex items-center gap-2 cursor-pointer hover:text-orange-600 transition-colors"
            >
              {showAll ? t('collapseAll') : t('expandAll')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${showAll ? 'rotate-90' : ''}`}
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

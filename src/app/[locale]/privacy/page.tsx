'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    const t = useTranslations('privacy');

    const sections = [
        { title: t('section1Title'), content: t.raw('section1Content') },
        { title: t('section2Title'), content: t.raw('section2Content') },
        { title: t('section3Title'), content: t.raw('section3Content') },
        { title: t('section4Title'), content: t.raw('section4Content') },
        { title: t('section5Title'), content: t.raw('section5Content') },
        { title: t('section6Title'), content: t.raw('section6Content') },
        { title: t('section7Title'), content: t.raw('section7Content') },
        { title: t('section8Title'), content: t.raw('section8Content') },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Content */}
            <main className="px-6 lg:px-20 py-12 lg:py-20 max-w-4xl mx-auto">
                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-8">
                    {t('pageTitle')}
                </h1>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <h2 className="text-xl font-semibold text-black mb-4">
                                {index + 1}. {section.title}
                            </h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer info */}
                <div className="mt-12 pt-8 border-t border-gray-300 text-sm text-gray-500">
                    <p>{t('lastUpdated')}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

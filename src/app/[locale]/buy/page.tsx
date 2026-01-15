'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BuyPage() {
    const t = useTranslations('buyPage');
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/payu/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 129900, // 10.00 PLN in grosz (TEST AMOUNT)
                    description: 'Migraine Without Secrets - Founders Edition',
                }),
            });

            const data = await response.json();

            if (data.redirectUri) {
                window.location.href = data.redirectUri;
            } else {
                console.error('Payment error:', data.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Mobile Layout */}
                <section className="lg:hidden px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <h1 className="text-2xl font-bold text-black mb-4 text-center">
                            {t('title')}
                        </h1>
                        <p className="text-gray-600 text-center mb-8">
                            {t('subtitle')}
                        </p>

                        {/* Google Form Embed */}
                        <div className="mb-6">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                                {/* Header */}
                                <div className="bg-linear-to-r from-[#2B183D] to-[#3d2456] px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-lg font-semibold text-white">
                                            {t('formTitle')}
                                        </h2>
                                    </div>
                                </div>
                                {/* Form Container */}
                                <div className="p-2 bg-[#fafafa]">
                                    <div className="relative w-full" style={{ paddingBottom: '130%' }}>
                                        <iframe
                                            src="https://docs.google.com/forms/d/e/1FAIpQLSd4RYGqdSsp66nnlNaD_IZMfU7s6Mc_c7fx4YqAR-KS7xnU_w/viewform?embedded=true"
                                            className="absolute inset-0 w-full h-full border-0 rounded"
                                            title="Registration Form"
                                        >
                                            Loading…
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-[#F3F3EF] p-4">
                            <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                {t('paymentTitle')}
                            </h2>

                            {/* Price Display */}
                            <div className="text-center mb-6">
                                <div className="text-gray-500 text-sm line-through mb-1">
                                    1,699 zł
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-orange-500 text-4xl font-bold">1,299 zł</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-2">
                                    {t('priceNote')}
                                </p>
                            </div>

                            {/* PayU Button */}
                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="w-full bg-[#F79155] hover:bg-orange-500 disabled:bg-gray-400 text-white font-semibold px-6 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg cursor-pointer"
                            >
                                {isLoading ? (
                                    <span>{t('processing')}</span>
                                ) : (
                                    <>
                                        {t('payButton')}
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
                                    </>
                                )}
                            </button>

                            {/* PayU Badge */}
                            <div className="mt-4 text-center">
                                <p className="text-gray-500 text-xs">{t('securePayment')}</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Desktop Layout */}
                <section className="hidden lg:block px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-black mb-4">
                                {t('title')}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {t('subtitle')}
                            </p>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Left Column - Google Form */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                                {/* Header */}
                                <div className="bg-linear-to-r from-[#2B183D] to-[#3d2456] px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-white">
                                                {t('formTitle')}
                                            </h2>
                                            <p className="text-purple-200 text-sm">Fill out to complete registration</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Form Container */}
                                <div className="p-3 bg-[#fafafa]">
                                    <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                                        <iframe
                                            src="https://docs.google.com/forms/d/e/1FAIpQLSd4RYGqdSsp66nnlNaD_IZMfU7s6Mc_c7fx4YqAR-KS7xnU_w/viewform?embedded=true"
                                            className="absolute inset-0 w-full h-full border-0 rounded-lg"
                                            title="Registration Form"
                                        >
                                            Loading…
                                        </iframe>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Payment */}
                            <div className="bg-[#F3F3EF] p-8">
                                <h2 className="text-xl font-semibold text-black mb-6 text-center">
                                    {t('paymentTitle')}
                                </h2>

                                {/* What's Included */}
                                <div className="mb-8">
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{t('included1')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{t('included2')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{t('included3')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{t('included4')}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Price Display */}
                                <div className="text-center mb-8 p-6 bg-white">
                                    <div className="text-gray-500 text-sm line-through mb-1">
                                        1,699 zł
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-orange-500 text-5xl font-bold">1,299 zł</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {t('priceNote')}
                                    </p>
                                </div>

                                {/* PayU Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                    className="w-full bg-[#F79155] hover:bg-orange-500 disabled:bg-gray-400 text-white font-semibold px-8 py-4 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl cursor-pointer text-lg"
                                >
                                    {isLoading ? (
                                        <span>{t('processing')}</span>
                                    ) : (
                                        <>
                                            {t('payButton')}
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
                                        </>
                                    )}
                                </button>

                                {/* PayU Badge */}
                                <div className="mt-4 text-center">
                                    <p className="text-gray-500 text-sm">{t('securePayment')}</p>
                                </div>

                                {/* Money Back Guarantee */}
                                <div className="mt-6 p-4 border-2 border-orange-500 text-center">
                                    <p className="text-black font-semibold">{t('guarantee')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

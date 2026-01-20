'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BuyPage() {
    const t = useTranslations('buyPage');
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Check for payment success on mount
    useEffect(() => {
        const status = searchParams.get('status');
        if (status === 'success') {
            setPaymentSuccess(true);
        }
    }, [searchParams]);

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
                        {paymentSuccess ? (
                            /* Post-Payment: Show Registration Form */
                            <>
                                {/* Success Header */}
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h1 className="text-2xl font-bold text-black mb-2">
                                        {t('successTitle')}
                                    </h1>
                                    <p className="text-gray-600">
                                        {t('successSubtitle')}
                                    </p>
                                </div>

                                {/* Registration Form */}
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
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
                            </>
                        ) : (
                            /* Pre-Payment: Show Payment Section */
                            <>
                                {/* Header */}
                                <h1 className="text-2xl font-bold text-black mb-4 text-center">
                                    {t('title')}
                                </h1>
                                <p className="text-gray-600 text-center mb-8">
                                    {t('subtitle')}
                                </p>

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

                                    {/* Guaranteed Safe Checkout */}
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-3 text-center">{t('guaranteedCheckout')}</p>
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Apple Pay */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center min-w-[50px] h-[32px]">
                                                <svg className="h-5" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.36 2.88C8.76 3.6 7.86 4.14 6.96 4.08C6.84 3.18 7.26 2.22 7.8 1.56C8.4 0.84 9.36 0.36 10.14 0.3C10.24 1.24 9.9 2.16 9.36 2.88ZM10.14 4.26C8.7 4.18 7.46 5.06 6.78 5.06C6.08 5.06 5.04 4.3 3.88 4.32C2.38 4.34 1.02 5.16 0.26 6.48C-1.28 9.12 -0.18 13.02 1.32 15.18C2.02 16.24 2.86 17.42 4.02 17.38C5.14 17.34 5.56 16.64 6.92 16.64C8.28 16.64 8.66 17.38 9.84 17.36C11.04 17.34 11.76 16.28 12.46 15.22C13.26 14.02 13.58 12.86 13.6 12.8C13.58 12.78 11.1 11.86 11.08 9.02C11.06 6.62 13.04 5.48 13.14 5.42C11.98 3.7 10.18 3.52 9.6 3.46C10.14 4.26 10.14 4.26 10.14 4.26Z" fill="black" />
                                                    <text x="15" y="13" fontSize="10" fontWeight="600" fill="black">Pay</text>
                                                </svg>
                                            </div>
                                            {/* Google Pay */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center min-w-[50px] h-[32px]">
                                                <svg className="h-4" viewBox="0 0 41 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1 8.4V13.6H17.5V2.3H21.5C22.6 2.3 23.5 2.6 24.2 3.3C24.9 4 25.3 4.8 25.3 5.8C25.3 6.8 24.9 7.7 24.2 8.3C23.5 9 22.6 9.3 21.5 9.3H19.1V8.4ZM19.1 3.8V7.8H21.5C22.2 7.8 22.8 7.6 23.2 7.2C23.7 6.8 23.9 6.3 23.9 5.8C23.9 5.2 23.7 4.8 23.2 4.4C22.8 4 22.2 3.8 21.5 3.8H19.1Z" fill="#5F6368" />
                                                    <text x="26" y="13" fontSize="9" fontWeight="500" fill="#5F6368">Pay</text>
                                                    <circle cx="6" cy="8" r="5" fill="#4285F4" />
                                                </svg>
                                            </div>
                                            {/* Mastercard */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center min-w-[36px] h-[32px]">
                                                <svg className="h-5" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="11" cy="10" r="9" fill="#EB001B" />
                                                    <circle cx="21" cy="10" r="9" fill="#F79E1B" />
                                                    <path d="M16 3.8C17.9 5.3 19.1 7.5 19.1 10C19.1 12.5 17.9 14.7 16 16.2C14.1 14.7 12.9 12.5 12.9 10C12.9 7.5 14.1 5.3 16 3.8Z" fill="#FF5F00" />
                                                </svg>
                                            </div>
                                            {/* Maestro */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center min-w-[36px] h-[32px]">
                                                <svg className="h-5" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="11" cy="10" r="9" fill="#0099DF" />
                                                    <circle cx="21" cy="10" r="9" fill="#EE0005" />
                                                    <path d="M16 3.8C17.9 5.3 19.1 7.5 19.1 10C19.1 12.5 17.9 14.7 16 16.2C14.1 14.7 12.9 12.5 12.9 10C12.9 7.5 14.1 5.3 16 3.8Z" fill="#6C6BBD" />
                                                </svg>
                                            </div>
                                            {/* Visa */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center min-w-[36px] h-[32px]">
                                                <svg className="h-3" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <text x="0" y="13" fontSize="14" fontWeight="700" fill="#1A1F71">VISA</text>
                                                </svg>
                                            </div>
                                            {/* BLIK */}
                                            <div className="bg-black rounded px-2 py-1.5 flex items-center justify-center min-w-[40px] h-[32px]">
                                                <svg className="h-3" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <text x="0" y="11" fontSize="11" fontWeight="700" fill="white">blik</text>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
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
                        {paymentSuccess ? (
                            /* Post-Payment: Show Registration Form centered */
                            <>
                                {/* Success Header */}
                                <div className="text-center mb-12">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h1 className="text-5xl font-bold text-black mb-4">
                                        {t('successTitle')}
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        {t('successSubtitle')}
                                    </p>
                                </div>

                                {/* Registration Form - Centered */}
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
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
                                                    <p className="text-purple-200 text-sm">{t('formSubtitle')}</p>
                                                </div>
                                            </div>
                                        </div>
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
                                </div>
                            </>
                        ) : (
                            /* Pre-Payment: Show Payment Section */
                            <>
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <h1 className="text-5xl font-bold text-black mb-4">
                                        {t('title')}
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        {t('subtitle')}
                                    </p>
                                </div>

                                {/* Payment Card - Centered */}
                                <div className="max-w-xl mx-auto">
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

                                        {/* Guaranteed Safe Checkout */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <p className="text-gray-400 text-xs uppercase tracking-wide mb-3 text-center">{t('guaranteedCheckout')}</p>
                                            <div className="flex items-center justify-center gap-3">
                                                {/* Apple Pay */}
                                                <div className="bg-white border border-gray-200 rounded px-3 py-2 flex items-center justify-center min-w-[56px] h-[36px]">
                                                    <svg className="h-5" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.36 2.88C8.76 3.6 7.86 4.14 6.96 4.08C6.84 3.18 7.26 2.22 7.8 1.56C8.4 0.84 9.36 0.36 10.14 0.3C10.24 1.24 9.9 2.16 9.36 2.88ZM10.14 4.26C8.7 4.18 7.46 5.06 6.78 5.06C6.08 5.06 5.04 4.3 3.88 4.32C2.38 4.34 1.02 5.16 0.26 6.48C-1.28 9.12 -0.18 13.02 1.32 15.18C2.02 16.24 2.86 17.42 4.02 17.38C5.14 17.34 5.56 16.64 6.92 16.64C8.28 16.64 8.66 17.38 9.84 17.36C11.04 17.34 11.76 16.28 12.46 15.22C13.26 14.02 13.58 12.86 13.6 12.8C13.58 12.78 11.1 11.86 11.08 9.02C11.06 6.62 13.04 5.48 13.14 5.42C11.98 3.7 10.18 3.52 9.6 3.46C10.14 4.26 10.14 4.26 10.14 4.26Z" fill="black" />
                                                        <text x="15" y="13" fontSize="10" fontWeight="600" fill="black">Pay</text>
                                                    </svg>
                                                </div>
                                                {/* Google Pay */}
                                                <div className="bg-white border border-gray-200 rounded px-3 py-2 flex items-center justify-center min-w-[56px] h-[36px]">
                                                    <svg className="h-4" viewBox="0 0 41 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.1 8.4V13.6H17.5V2.3H21.5C22.6 2.3 23.5 2.6 24.2 3.3C24.9 4 25.3 4.8 25.3 5.8C25.3 6.8 24.9 7.7 24.2 8.3C23.5 9 22.6 9.3 21.5 9.3H19.1V8.4ZM19.1 3.8V7.8H21.5C22.2 7.8 22.8 7.6 23.2 7.2C23.7 6.8 23.9 6.3 23.9 5.8C23.9 5.2 23.7 4.8 23.2 4.4C22.8 4 22.2 3.8 21.5 3.8H19.1Z" fill="#5F6368" />
                                                        <text x="26" y="13" fontSize="9" fontWeight="500" fill="#5F6368">Pay</text>
                                                        <circle cx="6" cy="8" r="5" fill="#4285F4" />
                                                    </svg>
                                                </div>
                                                {/* Mastercard */}
                                                <div className="bg-white border border-gray-200 rounded px-3 py-2 flex items-center justify-center min-w-[40px] h-[36px]">
                                                    <svg className="h-5" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="11" cy="10" r="9" fill="#EB001B" />
                                                        <circle cx="21" cy="10" r="9" fill="#F79E1B" />
                                                        <path d="M16 3.8C17.9 5.3 19.1 7.5 19.1 10C19.1 12.5 17.9 14.7 16 16.2C14.1 14.7 12.9 12.5 12.9 10C12.9 7.5 14.1 5.3 16 3.8Z" fill="#FF5F00" />
                                                    </svg>
                                                </div>
                                                {/* Maestro */}
                                                <div className="bg-white border border-gray-200 rounded px-3 py-2 flex items-center justify-center min-w-[40px] h-[36px]">
                                                    <svg className="h-5" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="11" cy="10" r="9" fill="#0099DF" />
                                                        <circle cx="21" cy="10" r="9" fill="#EE0005" />
                                                        <path d="M16 3.8C17.9 5.3 19.1 7.5 19.1 10C19.1 12.5 17.9 14.7 16 16.2C14.1 14.7 12.9 12.5 12.9 10C12.9 7.5 14.1 5.3 16 3.8Z" fill="#6C6BBD" />
                                                    </svg>
                                                </div>
                                                {/* Visa */}
                                                <div className="bg-white border border-gray-200 rounded px-3 py-2 flex items-center justify-center min-w-[40px] h-[36px]">
                                                    <svg className="h-3" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <text x="0" y="13" fontSize="14" fontWeight="700" fill="#1A1F71">VISA</text>
                                                    </svg>
                                                </div>
                                                {/* BLIK */}
                                                <div className="bg-black rounded px-3 py-2 flex items-center justify-center min-w-[44px] h-[36px]">
                                                    <svg className="h-3" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <text x="0" y="11" fontSize="11" fontWeight="700" fill="white">blik</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Money Back Guarantee */}
                                        <div className="mt-6 p-4 border-2 border-orange-500 text-center">
                                            <p className="text-black font-semibold">{t('guarantee')}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BuyPage() {
    const t = useTranslations('buyPage');
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    // Check for payment success on mount
    useEffect(() => {
        const status = searchParams.get('status');
        if (status === 'success') {
            setPaymentSuccess(true);
        }
    }, [searchParams]);

    const handlePayment = async () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/tpay/create-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1299.00,
                    description: 'Migraine Without Secrets - Founders Edition',
                    payer: {
                        email: formData.email,
                        name: formData.name,
                    }
                }),
            });

            const data = await response.json();

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                console.error('Payment error:', data.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

                                    {/* Inputs */}
                                    <div className="mb-4 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('nameLabel')}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder={t('namePlaceholder')}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder={t('emailPlaceholder')}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-black"
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Button */}
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
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            {/* Apple Pay */}
                                            <div className="bg-black rounded px-3 py-1.5 flex items-center justify-center h-8 w-14">
                                                <svg viewBox="0 0 38 16" className="h-4 w-auto fill-white">
                                                    <path d="M5.895 12.876c-.722.012-1.396-.345-1.745-1.056-.25-.37-.367-.812-.338-1.26.004-1.294 1.109-2.096 3.655-2.083.003.774-.155 1.303-.503 1.954-.31.32-.705.46-1.07.445zm.308-5.32c-1.554.076-4.996.34-5.071 3.522-.05 2.147 2.016 3.013 3.56 3.013.9 0 1.905-.28 2.062-.28.158 0 .977.292 2.05.292 1.458 0 2.222-.843 3.109-2.059-.838-.456-1.381-1.3-1.427-2.27-.066-2.185 1.776-2.903 2.502-3.14-.52-2.316-2.29-2.52-2.92-2.535-1.125-.03-2.146.657-2.618.657-.52 0-1.751-.716-2.614-.716-.94-.038-2.611.584-3.413 2.128-.501.996-.703 2.766.19 4.312l4.588-2.924zm7.957 6.134h1.492v-8.73h-1.492v8.73zm2.583 0h1.492V8.583h.053c.27-.86.994-1.517 2.193-1.517.13 0 .26.01.39.03v-1.42a2.38 2.38 0 00-1.882.522c-.419.41-.663.97-.692 1.558h-.053V7.228H16.74v6.463zm5.636 0h1.493v-2.82c0-1.52.548-2.18 1.95-2.18.23 0 .42.02.58.05v-1.37a2.536 2.536 0 00-2.04.66 2.35 2.35 0 00-.63 1.35h-.05V7.227h-1.303v6.463zm5.419 0h1.492v-8.73h-1.492v8.73zm1.637-10.43a.87.87 0 101.74 0 .87.87 0 00-1.74 0zm6.183 10.603c1.78 0 2.802-.857 3.047-2.183l-1.354-.23c-.114.61-.482.97-1.46.97-1.07 0-1.86-.71-1.86-2.67 0-1.84.73-2.63 1.83-2.63 1.05 0 1.34.46 1.45.98l1.32-.26c-.22-1.22-1.12-2.16-2.98-2.16-1.92 0-3.21 1.25-3.21 4.1.01 2.89 1.36 4.08 3.23 4.08z" />
                                                </svg>
                                            </div>
                                            {/* Google Pay */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                                <svg viewBox="0 0 42 17" className="h-4 w-auto">
                                                    <path fill="#4285F4" d="M6.5 7.15c0-.4-.03-.8-.1-1.18H.5v2.24h3.37c-.15.78-.6 1.45-1.27 1.89v1.57h2.05c1.2-1.1 1.88-2.73 1.88-4.52z" />
                                                    <path fill="#34A853" d="M.5 13.25c1.69 0 3.1-4.7 3.6-1.57h-2.05c-.53 1.6-2.03 2.75-3.8 2.75-1.08 0-2.05-.33-2.82-1.15l-1.7.53c.6 1.31 1.68 2.22 2.97 2.22z" />
                                                    <path fill="#FBBC05" d="M-1.75 11.68c-.28-.35-.44-.78-.44-1.25s.16-.9.44-1.25l-.57-1.68c-1.18 1.15-1.18 3.03 0 4.18l.57-1.68z" />
                                                    <path fill="#EA4335" d="M.5 7.6c1.08 0 2.05.37 2.82 1.09l1.63-1.63c-1.2-1.12-2.75-1.8-4.45-1.8-2.64 0-4.94 1.5-6.03 3.68l2.06 1.57c.53-1.6 2.03-2.91 3.97-2.91z" />
                                                    <path fill="#5F6368" d="M11.6 8.5v6.5h-1.9v-6m4.8 6.5h-1.9V8.5h1.9v6.5m5.7-6.5h-2.9l-1.6 3.8-1.7-3.8h-2l2.6 5.8-1.5 3.3h2l4.8-10.6" />
                                                </svg>
                                            </div>
                                            {/* Mastercard */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                                <svg viewBox="0 0 36 22" className="h-5 w-auto">
                                                    <circle cx="11" cy="11" r="11" fill="#EB001B" />
                                                    <circle cx="25" cy="11" r="11" fill="#F79E1B" />
                                                    <path d="M18 11V11C18 12.33 18.25 13.59 18.71 14.73C19.34 16.29 20.31 17.65 21.52 18.73C20.5 19.53 19.29 20 18 20C16.71 20 15.5 19.53 14.48 18.73C15.69 17.65 16.66 16.29 17.29 14.73C17.75 13.59 18 12.33 18 11Z" fill="#FF5F00" />
                                                </svg>
                                            </div>
                                            {/* Visa */}
                                            <div className="bg-white border border-gray-200 rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                                <svg viewBox="0 0 36 12" className="h-3 w-auto">
                                                    <path fill="#142787" d="M13.6 11.2h2.2l3.4-10.4h-2.3c-1.4 0-1.7.5-2.2 1.7l-5.6 12.5h2.2l4.6-7 1.4 7zm11.4-12.5h-2.3c-.6 0-1.1.2-1.3.8l-4.5 10.8h2.4l.7-2h3l.3 2h2.1l-1.9-8.8c.1-.4 0-.8-1.5-.8zm-2.6 6.5l1.6-4.5.9 4.5h-2.5zm-8.8 3.9h2.3l1.4-8.8h-2.3l-1.4 8.8zm-3.6-8.8l-2.8 7.4-.3-1.6c-.5-1.8-2.2-3.8-4-4.8l2.6 9.6h2.4L9.9.8h-2.4z" />
                                                </svg>
                                            </div>
                                            {/* BLIK */}
                                            <div className="bg-black rounded px-2 py-1 flex items-center justify-center h-8 w-14">
                                                <span className="text-white text-xs font-bold tracking-wide">blik</span>
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

                                        {/* Inputs */}
                                        <div className="mb-6 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('nameLabel')}</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder={t('namePlaceholder')}
                                                    className="w-full p-3 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-black"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')}</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder={t('emailPlaceholder')}
                                                    className="w-full p-3 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-black"
                                                />
                                            </div>
                                        </div>

                                        {/* Pay Button */}
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
                                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                                {/* Apple Pay */}
                                                <div className="bg-black rounded px-3 py-1.5 flex items-center justify-center h-9 w-16">
                                                    <svg viewBox="0 0 38 16" className="h-5 w-auto fill-white">
                                                        <path d="M5.895 12.876c-.722.012-1.396-.345-1.745-1.056-.25-.37-.367-.812-.338-1.26.004-1.294 1.109-2.096 3.655-2.083.003.774-.155 1.303-.503 1.954-.31.32-.705.46-1.07.445zm.308-5.32c-1.554.076-4.996.34-5.071 3.522-.05 2.147 2.016 3.013 3.56 3.013.9 0 1.905-.28 2.062-.28.158 0 .977.292 2.05.292 1.458 0 2.222-.843 3.109-2.059-.838-.456-1.381-1.3-1.427-2.27-.066-2.185 1.776-2.903 2.502-3.14-.52-2.316-2.29-2.52-2.92-2.535-1.125-.03-2.146.657-2.618.657-.52 0-1.751-.716-2.614-.716-.94-.038-2.611.584-3.413 2.128-.501.996-.703 2.766.19 4.312l4.588-2.924zm7.957 6.134h1.492v-8.73h-1.492v8.73zm2.583 0h1.492V8.583h.053c.27-.86.994-1.517 2.193-1.517.13 0 .26.01.39.03v-1.42a2.38 2.38 0 00-1.882.522c-.419.41-.663.97-.692 1.558h-.053V7.228H16.74v6.463zm5.636 0h1.493v-2.82c0-1.52.548-2.18 1.95-2.18.23 0 .42.02.58.05v-1.37a2.536 2.536 0 00-2.04.66 2.35 2.35 0 00-.63 1.35h-.05V7.227h-1.303v6.463zm5.419 0h1.492v-8.73h-1.492v8.73zm1.637-10.43a.87.87 0 101.74 0 .87.87 0 00-1.74 0zm6.183 10.603c1.78 0 2.802-.857 3.047-2.183l-1.354-.23c-.114.61-.482.97-1.46.97-1.07 0-1.86-.71-1.86-2.67 0-1.84.73-2.63 1.83-2.63 1.05 0 1.34.46 1.45.98l1.32-.26c-.22-1.22-1.12-2.16-2.98-2.16-1.92 0-3.21 1.25-3.21 4.1.01 2.89 1.36 4.08 3.23 4.08z" />
                                                    </svg>
                                                </div>
                                                {/* Google Pay */}
                                                <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center h-9 w-16">
                                                    <svg viewBox="0 0 42 17" className="h-5 w-auto">
                                                        <path fill="#4285F4" d="M6.5 7.15c0-.4-.03-.8-.1-1.18H.5v2.24h3.37c-.15.78-.6 1.45-1.27 1.89v1.57h2.05c1.2-1.1 1.88-2.73 1.88-4.52z" />
                                                        <path fill="#34A853" d="M.5 13.25c1.69 0 3.1-4.7 3.6-1.57h-2.05c-.53 1.6-2.03 2.75-3.8 2.75-1.08 0-2.05-.33-2.82-1.15l-1.7.53c.6 1.31 1.68 2.22 2.97 2.22z" />
                                                        <path fill="#FBBC05" d="M-1.75 11.68c-.28-.35-.44-.78-.44-1.25s.16-.9.44-1.25l-.57-1.68c-1.18 1.15-1.18 3.03 0 4.18l.57-1.68z" />
                                                        <path fill="#EA4335" d="M.5 7.6c1.08 0 2.05.37 2.82 1.09l1.63-1.63c-1.2-1.12-2.75-1.8-4.45-1.8-2.64 0-4.94 1.5-6.03 3.68l2.06 1.57c.53-1.6 2.03-2.91 3.97-2.91z" />
                                                        <path fill="#5F6368" d="M11.6 8.5v6.5h-1.9v-6m4.8 6.5h-1.9V8.5h1.9v6.5m5.7-6.5h-2.9l-1.6 3.8-1.7-3.8h-2l2.6 5.8-1.5 3.3h2l4.8-10.6" />
                                                    </svg>
                                                </div>
                                                {/* Mastercard */}
                                                <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center h-9 w-16">
                                                    <svg viewBox="0 0 36 22" className="h-6 w-auto">
                                                        <circle cx="11" cy="11" r="11" fill="#EB001B" />
                                                        <circle cx="25" cy="11" r="11" fill="#F79E1B" />
                                                        <path d="M18 11V11C18 12.33 18.25 13.59 18.71 14.73C19.34 16.29 20.31 17.65 21.52 18.73C20.5 19.53 19.29 20 18 20C16.71 20 15.5 19.53 14.48 18.73C15.69 17.65 16.66 16.29 17.29 14.73C17.75 13.59 18 12.33 18 11Z" fill="#FF5F00" />
                                                    </svg>
                                                </div>
                                                {/* Visa */}
                                                <div className="bg-white border border-gray-200 rounded px-2 py-1.5 flex items-center justify-center h-9 w-16">
                                                    <svg viewBox="0 0 36 12" className="h-3.5 w-auto">
                                                        <path fill="#142787" d="M13.6 11.2h2.2l3.4-10.4h-2.3c-1.4 0-1.7.5-2.2 1.7l-5.6 12.5h2.2l4.6-7 1.4 7zm11.4-12.5h-2.3c-.6 0-1.1.2-1.3.8l-4.5 10.8h2.4l.7-2h3l.3 2h2.1l-1.9-8.8c.1-.4 0-.8-1.5-.8zm-2.6 6.5l1.6-4.5.9 4.5h-2.5zm-8.8 3.9h2.3l1.4-8.8h-2.3l-1.4 8.8zm-3.6-8.8l-2.8 7.4-.3-1.6c-.5-1.8-2.2-3.8-4-4.8l2.6 9.6h2.4L9.9.8h-2.4z" />
                                                    </svg>
                                                </div>
                                                {/* BLIK */}
                                                <div className="bg-black rounded px-2 py-1.5 flex items-center justify-center h-9 w-16">
                                                    <span className="text-white text-sm font-bold tracking-wide">blik</span>
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
